import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);
import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  publicRoutes,
  apiAuthPrefix,
} from "@/routes";
import { NextResponse } from "next/server";

export default auth((req) => {
  const nextUrl = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // always allow public routes
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // always allow next-auth catch-all routes
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // when trying to log in or register
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  // unlogged users trying to access private routes
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }
  return NextResponse.next();
});

export const config = {
  // Match all the routes that invoke the middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

export const runtime = "experimental-edge";
