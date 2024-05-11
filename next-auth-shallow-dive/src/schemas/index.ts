import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, {
    message: "Password is required",
  }), // NOTE: don't limit login
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }), // NOTE: don't limit login
  name: z.string().min(1, {
    message: "Name is required",
  }),
});
