import authConfig from "@/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log("Route: ", req.nextUrl.pathname);
  console.log("Is logged in: ", isLoggedIn);
});

export const config = {
  // Match all the routes that invoke the middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
