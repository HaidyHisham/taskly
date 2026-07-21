import { z } from "zod";

export const resetSchema = z
  .object({
    password: z
      .string({
        error: (issue) =>
          issue.input === undefined ? "Password is required" : "Not a string",
      })
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password should be at most 64 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one digit")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    confirmPassword: z.string({
      error: (issue) =>
        issue.input === undefined ? "Confirm Password is required" : "Not a string",
    }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TResetInput = z.infer<typeof resetSchema>;
