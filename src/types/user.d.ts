export type PLAN = "FREE" | "PRO";

export type User = {
  id: string;
  name?: string | null;
  email: string;
  plan: PLAN;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  stripeCurrentPeriodEnd?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
