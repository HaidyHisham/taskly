
import z from 'zod';

export const epicsSchema = z.object({
    title: z
        .string({
            error: (issue) =>
                issue.input === undefined ? 'Epic title is required' : 'Not a string',
        })
        .min(3, 'Epic title must be at least 3 characters')
        .max(100, 'Epic title must be at most 100 characters'),
    description: z
        .string()
        .max(500, 'Epic description must be at most 500 characters')
        .optional(),
    assignee_id: z.string().optional(),
    deadline: z
        .string()
        .refine(
            (val) => {
                if (!val) return true;
                const selectedDate = new Date(val).getTime();
                return selectedDate >= new Date().getTime();
            },
            {
                message: 'Must be today or future',
            }
        )
        .optional(),
});

export type TEpicsInput = z.infer<typeof epicsSchema>;