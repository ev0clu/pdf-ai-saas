"use server";
import { signIn, signOut } from "@/auth";

export async function signInAction(provider: string | undefined) {
  await signIn(provider, { redirectTo: "/dashboard" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
