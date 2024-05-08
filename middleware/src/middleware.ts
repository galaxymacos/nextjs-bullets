import { NextRequest, NextResponse } from "next/server";

// 1. use middleware to redirect or export default to redirect routes
// export function middleware(req: NextRequest) {
//   return NextResponse.redirect(new URL("/", req.url));
// }
// export const config = {
//   matcher: "/admin",
// };

// 2. conditional logic
// export function middleware(req: NextRequest) {
// if (req.nextUrl.pathname.startsWith("/admin")) {
//     return NextResponse.rewrite(new URL("/", req.url)); // The url stays the same, but the content changes
// }

// 3. get and set cookies in middleware
// export function middleware(req: NextRequest) {
//   const response = NextResponse.next();
//   const themePerference = req.cookies.get("theme");
//   if (!themePerference) {
//     response.cookies.set("theme", "dark");
//   }
//   return response;
// }

// 4. set headers in middleware, useful for passing additional information in responses
// export function middleware(req: NextRequest) {
//   const response = NextResponse.next();
//   response.headers.set("x-custom-header", "hello");
//   return response;
// }

// 5. working with cookies
// export function middleware(req: NextRequest) {
//   req.cookies.delete("auth"); // modifying the cookie in the request won't delete the cookie from the browser, just ignoring it
//   const auth_cookie = req.cookies.get("auth")?.value;
//   console.log(auth_cookie);
//      const allCookies = req.cookies.getAll();
//      console.log("all cookies: ", allCookies);
//   const response = NextResponse.next();
//   response.cookies.delete("auth"); // it will delete the cookie from the browser
//   response.cookies.set("isAuthed2", "true");
//   return response;
// }

// export const config = {
//   matcher: "/",
// };

// 6. working with headers
export function middleware(req: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: new Headers(req.headers),
    },
  });

  // log all headers
  const headers = req.headers;
  // console.log("all headers: ", headers);

  response.headers.set("isAuthed", "true");
  console.log("response headers: ", response.headers);

  return response;
}
