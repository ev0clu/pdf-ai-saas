import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../prisma/prisma";
import authConfig from "./auth.config";
import type { Adapter } from "next-auth/adapters";

const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },
  ...authConfig,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
