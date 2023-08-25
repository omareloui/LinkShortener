import mongoose from "mongoose";
import { config } from "../config";

export const connect = () =>
  new Promise(async (res, rej) => {
    if (mongoose.connection.readyState === 1) return res(true);

    try {
      await mongoose.connect(config.dbLink);
      return res(true);
    } catch (e) {
      return rej(e);
    }
  });
