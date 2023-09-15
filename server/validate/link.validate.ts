import { z } from "zod";

export const CreateLinkDto = z.object({
  url: z.string().url().trim(),
  slug: z
    .string()
    .regex(/^[a-z0-9\-_]+$/)
    .trim()
    .optional(),
  isPrivate: z.boolean().optional(),
});

export type CreateLinkDto = z.infer<typeof CreateLinkDto>;
