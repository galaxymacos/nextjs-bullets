import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";

type ExtendedUser = DefaultSession["user"] & {
  // fields to extend
  customField: string;
  role: UserRole;
};
// Extend the NextAuth session and JWT types
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

// Extend the JWT token so we can pass the role
declare module "next-auth/jwt" {
  //
  interface JWT {
    role?: UserRole;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut, // used in server component to get the logged-in user session
} = NextAuth({
  pages: {
    signIn: "/auth/login", // go-to-page when sign-in goes wrong
    error: "/auth/error", // go-to-page when something goes wrong
  },
  events: {
    // This event will be called when a 3rd party oauth user is logged in
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow Oauth without email verification
      if (account?.provider !== "credentials") return true;
      if (!user) {
        return false;
      }
      const existingUser = await getUserById(user.id as string);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) {
        return false;
      }
      // TODO: add 2FA check
      return true;
    },
    async session({ token, session }) {
      // NOTE: this token can be changed
      console.log({ sessionToken: token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        // token.role is assigned below
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token; // no user id
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
