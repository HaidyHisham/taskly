
import { z } from 'zod';

export const inviteMemberSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please provide a valid email'),
});

export type TInviteMemberInput = z.infer<typeof inviteMemberSchema>;