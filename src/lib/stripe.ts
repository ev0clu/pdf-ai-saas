import Stripe from "stripe";
import { env } from "./env";
import type { PLAN, User } from "@/types/user";
import { prisma } from "../../prisma/prisma";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});

export async function createCustomerInStripe(userId: string, email: string) {
  const customerData = {
    metadata: {
      userId: userId,
    },
    email: email ?? "",
  };
  const customer = await stripe.customers.create(customerData);

  return customer;
}

export async function retrieveCustomerInStripe(stripeCustomerId: string) {
  const existingStripeCustomer =
    await stripe.customers.retrieve(stripeCustomerId);

  if (!existingStripeCustomer) return null;

  return existingStripeCustomer;
}

export async function subscriptionStripeSession(user: User) {
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [
      {
        price: env.STRIPE_PRODUCT_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: user.email,
    metadata: {
      userId: user.id,
    },
    success_url: `${env.DOMAIN}/subscription?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.DOMAIN}/subscription?canceled=true`,
  });

  return session;
}

export async function billingPortalStripeSession(stripeCustomerId: string) {
  if (stripeCustomerId) {
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${env.DOMAIN}/subscription`,
    });

    return session;
  } else throw new Error("Stripe customer Id is missing");
}

export async function getSubscriptionInformations(userId: string | undefined) {
  if (!userId) {
    return {
      userId: "",
      plan: "FREE" as PLAN,
      isSubscribed: false,
      isCanceled: false,
      stripeCustomerId: "",
      stripeSubscriptionId: "",
      stripeCurrentPeriodEnd: "",
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || !user.stripeSubscriptionId) {
    return {
      userId: userId ?? "",
      plan: "FREE" as PLAN,
      isSubscribed: false,
      isCanceled: false,
      stripeCustomerId: "",
      stripeSubscriptionId: "",
      stripeCurrentPeriodEnd: "",
    };
  }

  const isSubscribed = Boolean(
    user?.stripeCurrentPeriodEnd && // 86400000 = 1 day
      user?.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now(),
  );

  const stripePlan = await stripe.subscriptions.retrieve(
    user.stripeSubscriptionId,
  );

  return {
    userId: userId,
    plan: user?.plan as PLAN,
    isSubscribed: isSubscribed,
    isCanceled: stripePlan.cancel_at_period_end,
    stripeCustomerId: user?.stripeCustomerId,
    stripeSubscriptionId: user?.stripeCustomerId,
    stripeCurrentPeriodEnd: user?.stripeCurrentPeriodEnd,
  };
}
