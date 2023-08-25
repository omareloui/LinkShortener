import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { config } from "~~/server/config";
import { SignDto } from "../validate";
import { errorHandler } from "../utils";

const { hashedKey, jwtSecret, jwtExpiresIn: expiresIn } = config;

class AuthController {
  sign = eventHandler(async event => {
    try {
      const { key } = SignDto.parse(await readBody(event));
      const keyMatch = await bcrypt.compare(key, hashedKey);
      if (!keyMatch)
        throw createError({ message: "Invalid key.", statusCode: 422, statusMessage: "Unprocessable Entity" });
      const token = jwt.sign({}, jwtSecret, { expiresIn });
      return { token, expiresIn };
    } catch (e) {
      errorHandler(e);
    }
  });

  refreshToken = eventHandler(async event => {
    const { context } = event;
    if (!context.isAuthed)
      throw createError({ message: "You have to be authenticated", statusCode: 401, statusMessage: "Unauthorized" });
    return { body: jwt.sign({}, jwtSecret, { expiresIn }), expiresIn };
  });
}

export const authController = new AuthController();
