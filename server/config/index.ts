import { z } from "zod";

type NodeEnv = "production" | "development";
const nodeEnv: NodeEnv = (process.env.NODE_ENV as NodeEnv | undefined) || "development";

const keyMinLength = 32;

const ZConfig = z.object({
  nodeEnv: z.enum(["production", "development"]),
  isProd: z.boolean(),
  isDev: z.boolean(),
  dbLink: z.string(),
  key: z.string().min(keyMinLength),
  keyMinLength: z.number(),
  jwtPrefix: z.string(),
  jwtSecret: z.string(),
  jwtExpiresIn: z.string().or(z.number()),
});

type ZConfig = z.infer<typeof ZConfig>;

const key = process.env.KEY;
const jwtPrefix = process.env.JWT_SECRET;

const config = ZConfig.parse({
  nodeEnv,
  isProd: nodeEnv === "production",
  isDev: nodeEnv === "development",
  dbLink: process.env.DB_URI,
  key,
  keyMinLength: 32,
  jwtPrefix,
  jwtSecret: `${jwtPrefix}.${key}`,
  jwtExpiresIn: process.env.TOKEN_EXPIRES_IN || "5d",
});

export { config };
