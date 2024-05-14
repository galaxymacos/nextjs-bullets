import { useSession } from "next-auth/react";

/**
 * A custom hook to get next-auth user object
 */
export const useCurrentUser = () => {
  const session = useSession();
  console.log("set current user as: ", session.data?.user.name);
  return session.data?.user;
};
