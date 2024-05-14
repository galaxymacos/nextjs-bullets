import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

// Two Factor
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

/**
 * Send a verification email to the user when they sign up
 * @param email The email address to send the verification email to
 * @param token a token to be consumed as a searchParam in /auth/new-verification
 */
export const sendVerificationLinkEmail = async (
  email: string,
  token: string,
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  await resend.emails.send({
    to: email,
    from: "onboarding@resend.dev",
    subject: "Please verify your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to verify your email.</p>`,
  });
};

/**
 * Send a password reset email to the user when they forgot the password
 * @param email
 * @param token a token to be consumed as searchParam in /auth/new-password
 */
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
};
