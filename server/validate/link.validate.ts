import { z } from "zod";

export const LinkSchema = z.object({
  url: z.string().url().trim(),
  slug: z
    .string()
    .regex(/^[a-z0-9\-_]+$/)
    .trim(),
});
