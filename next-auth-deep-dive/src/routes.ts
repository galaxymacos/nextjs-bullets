export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * include register and login pages
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * all users can access, never block
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after login
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
