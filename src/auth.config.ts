import "next-auth/jwt";
import Google from "next-auth/providers/google";
import type { DefaultSession, NextAuthConfig } from "next-auth";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Google],
  basePath: "/api/auth",
  callbacks: {
    async authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/dashboard" || pathname === "/subscription")
        return !!auth;
      return true;
    },
    async jwt({ token, trigger, session, account, user }) {
      if (trigger === "update") {
        token.user.plan = session.user.plan;
        token.user.stripeCurrentPeriodEnd = session.user.stripeCurrentPeriodEnd;
        token.user.stripeCustomerId = session.user.stripeCustomerId;
      }

      if (account?.provider === "google") {
        return {
          ...token,
          accessToken: account.access_token,
          user: {
            ...token.user,
            id: user.id ?? "",
            plan: user.plan ?? "FREE",
            stripeCustomerId: user.stripeCustomerId ?? "",
            stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd ?? "",
          },
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.plan = token.user.plan;
      session.user.id = token.user.id;
      session.user.stripeCurrentPeriodEnd = token.user.stripeCurrentPeriodEnd;
      session.user.stripeCustomerId = token.user.stripeCustomerId;

      return session;
    },
  },
} satisfies NextAuthConfig;

declare module "next-auth" {
  interface User {
    plan: "FREE" | "PRO";
    stripeCustomerId: string;
    stripeCurrentPeriodEnd: Date;
  }
  interface Session {
    accessToken?: string;
    user: {
      plan: "FREE" | "PRO";
      stripeCustomerId: string;
      stripeCurrentPeriodEnd: Date;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user: {
      id: string;
      plan: "FREE" | "PRO";
      stripeCustomerId: string;
      stripeCurrentPeriodEnd: Date;
    };
  }
}
