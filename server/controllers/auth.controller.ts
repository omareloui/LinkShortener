import jwt from "jsonwebtoken";

import { config } from "~~/server/config";
import { SignDto } from "../validate";
import { errorHandler } from "../utils";

const { key: envKey, jwtSecret, jwtExpiresIn } = config;

class AuthController {
  sign = eventHandler(async event => {
    try {
      const { key } = SignDto.parse(await readBody(event));

      if (key !== envKey) throw createError({ message: "Invalid key.", statusCode: 422 });

      const token = jwt.sign({}, jwtSecret, { expiresIn: jwtExpiresIn });

      return { body: token, expiresIn: jwtExpiresIn };
    } catch (e) {
      errorHandler(e);
    }
  });

  refreshToken = eventHandler(async event => {
    const { context } = event;
    if (context.isAuthed)
      return {
        body: jwt.sign({}, jwtSecret, { expiresIn: jwtExpiresIn }),
        expiresIn: jwtExpiresIn,
      };
    return {};
  });
}

export const authController = new AuthController();
