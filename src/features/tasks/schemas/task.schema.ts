import z from 'zod';

export const taskSchema = z.object({
  project_id: z.string({
    error: (issue) =>
      issue.input === undefined ? 'Project ID is required' : 'Not a string',
  }),
  title: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'Task title is required' : 'Not a string',
    })
    .min(3, 'Task title must be at least 3 characters')
    .max(100, 'Task title must be at most 100 characters'),
  epic_id: z.string().nullable().optional(),
  description: z
    .string()
    .max(500, 'Task description must be at most 500 characters')
    .optional(),
  assignee_id: z.string().nullable().optional(),
  due_date: z
    .string()
    .refine(
      (val) => {
        if (!val) return true;
        const selectedDate = new Date(val).getTime();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today.getTime();
      },
      {
        message: 'Deadline must be today or in the future',
      }
    )
    .optional(),
  status: z
    .enum([
      'TO_DO',
      'IN_PROGRESS',
      'BLOCKED',
      'IN_REVIEW',
      'READY_FOR_QA',
      'REOPENED',
      'READY_FOR_PRODUCTION',
      'DONE',
    ])
    .default('TO_DO')
    .optional(),
});

export type TTaskInput = z.infer<typeof taskSchema>;

