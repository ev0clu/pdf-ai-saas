import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../prisma/prisma";

const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  session: { strategy: "database", maxAge: 24 * 60 * 60 }, // 1 day -> 24h * 60min * 60sec
  callbacks: {
    /*authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/dashboard") return !!auth;
      return true;
    },*/
    async session({ session, user }) {
      session.user = user;
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
