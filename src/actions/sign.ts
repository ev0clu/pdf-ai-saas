"use server";

import { signIn, signOut } from "@/auth";

export async function handleSignIn(provider: string, redirectTo: string) {
  await signIn(provider, { redirectTo });
}

export async function handleSignOut(redirectTo: string) {
  await signOut({ redirectTo });
}
