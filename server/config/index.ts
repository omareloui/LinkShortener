import dotenv from "dotenv";

dotenv.config();

type NodeEnv = "production" | "development" | "test";

const env: NodeEnv =
  (process.env.NODE_ENV as NodeEnv | undefined) || "development";

const isProd = env === "production";
const isDev = env === "development";
const isTest = env === "test";

const key = process.env.KEY;
const jwtSecret = process.env.JWT_SECRET;

let dbLink: string | undefined;

if (isProd) dbLink = process.env.DB_URI;
else if (isTest) dbLink = process.env.DB_URI_TEST;

dbLink ||= process.env.DB_URI_DEV;

if (!dbLink) throw new Error("You have to provide the db uri");

if (!key) throw new Error("You have to provide a key.");
if (!jwtSecret) throw new Error("You have to provide a secret for the token.");

export const config = {
  isProd,
  isDev,
  isTest,
  dbLink,
  key,
  jwtSecret: `${jwtSecret}.${key}`,
  jwtExpiresIn: "5d",
};
