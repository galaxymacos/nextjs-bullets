import { auth } from "@/auth";

/**
 * Get the current user from the session
 */
export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};

/**
 * Get the current user's role from the session
 */
export const currentRole = async () => {
  const session = await auth();
  return session?.user?.role;
};
