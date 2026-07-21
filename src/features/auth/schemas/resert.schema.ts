import { z } from "zod";

export const resetSchema = z
  .object({
    password: z
      .string({
        error: (issue) =>
          issue.input === undefined ? 'Password is required' : 'Not a string',
      })
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password Should be at most 64 characters')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])\S+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
      ),
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
