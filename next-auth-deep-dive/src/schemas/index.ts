import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      return !(data.password && !data.newPassword);
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      return !(data.newPassword && !data.password);
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  );

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, {
    message: "Password is required",
  }), // NOTE: don't limit login
  code: z.optional(z.string()),
});

/**
 * Used for entering new password when redirected from email
 * password, newPassword: required
 */
export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

/**
 * Used for resetting password by providing the user email
 * Email: required
 */
export const ResetSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

/**
 * Email, name, password: required
 */
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
