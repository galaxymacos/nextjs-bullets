import { useSession } from "next-auth/react";

/**
 * A custom hook to get next-auth user object
 */
export const useCurrentUser = () => {
  const session = useSession();
  return session.data?.user;
};
