import { z } from "zod";

import { config } from "../config";

export const SignDto = z.object({
  key: z.string().min(config.keyMinLength).trim(),
});

export type SignDto = z.infer<typeof SignDto>;
