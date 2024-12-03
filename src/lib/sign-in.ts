"use server";

import { signIn } from "@/auth";

export const signInHandler = async (provider: string | undefined) => {
  await signIn(provider, { redirectTo: "/dashboard" });
};
