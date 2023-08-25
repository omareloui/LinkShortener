import { z } from "zod";

export const SignDto = z.object({
  key: z.string(),
});

export type SignDto = z.infer<typeof SignDto>;
