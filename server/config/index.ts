import dotenv from "dotenv";

dotenv.config();

export const config = {
  dbLink: process.env.DB_URI,
};
