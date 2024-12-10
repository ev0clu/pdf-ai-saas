import { type NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "../../../../prisma/prisma";
import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  const endpointSecret = `${env.STRIPE_WEBHOOK_SECRET}`;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    // console.log(event)

    const session = event.data.object as Stripe.Checkout.Session;

    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    if (!session?.metadata?.userId) {
      return NextResponse.json(
        {
          message: "Metadata not found",
        },
        { status: 500 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.metadata.userId },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 500 },
      );
    }

    switch (event.type) {
      case "checkout.session.completed": {
        if (!user.stripeCustomerId) {
          await prisma.user.update({
            where: {
              id: session.metadata.userId,
            },
            data: {
              plan: "PRO",
              stripeCustomerId: subscription.customer as string,
              stripeSubscriptionId: subscription.id,
              stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000,
              ),
            },
          });
        }
        break;
      }

      case "invoice.payment_succeeded":
        {
          // Retrieve the subscription details from Stripe.
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
          );

          await prisma.user.update({
            where: {
              id: subscription.metadata.userId,
            },
            data: {
              stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000,
              ),
            },
          });
        }
        break;

      default:
        break;
    }

    return NextResponse.json(
      {
        message: event,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Webhook error: ${error}`,
      },
      { status: 500 },
    );
  }
}
