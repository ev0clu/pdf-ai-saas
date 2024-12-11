import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import {
  subscriptionStripeSession,
  billingPortalStripeSession,
  getSubscriptionInformations,
} from "@/lib/stripe";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    const subscriptionInformations = await getSubscriptionInformations(
      session?.user.id,
    );
    return NextResponse.json(
      {
        message: { subscriptionInformations: subscriptionInformations },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        {
          message: "User id and/or email is missing",
        },
        { status: 500 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      if (user.plan === "PRO" && user.stripeCustomerId) {
        const billingPortalSession = await billingPortalStripeSession(
          user.stripeCustomerId,
        );

        if (billingPortalSession.url) {
          return NextResponse.json(
            {
              message: "Billing portal session has created successfully",
              stripeSessionUrl: billingPortalSession.url,
            },
            { status: 200 },
          );
        }
      }

      const subscriptionSession = await subscriptionStripeSession(user);

      if (subscriptionSession.url) {
        return NextResponse.json(
          {
            message: "Subscription session has created successfully",
            stripeSessionUrl: subscriptionSession.url,
          },
          { status: 200 },
        );
      }
    }

    return NextResponse.json(
      {
        message: "Subscription has failed",
        stripeSessionUrl: "",
      },
      { status: 503 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 },
    );
  }
}
