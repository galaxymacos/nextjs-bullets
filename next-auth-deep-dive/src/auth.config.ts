import type { NextAuthConfig } from "next-auth";
import GitHub from "@auth/core/providers/github";

export default {
  providers: [GitHub],
} satisfies NextAuthConfig;
