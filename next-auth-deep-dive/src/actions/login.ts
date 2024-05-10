"use server";
import { z } from "zod";
import { LoginSchema } from "@/schemas";

// This is a wrapper to Auth.js login function, in case some users have not verifiied their emails, they should not be logged in completely
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  return { success: "Email sent!" };
};
