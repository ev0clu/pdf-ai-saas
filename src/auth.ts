import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

const authOptions: NextAuthConfig = {
  providers: [Google],
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
