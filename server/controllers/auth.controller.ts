import jwt from "jsonwebtoken";

import { config } from "~~/server/config";

const { key: envKey, jwtSecret, jwtExpiresIn } = config;

export class AuthController {
  static sign = defineEventHandler(async event => {
    const { key } = await useBody(event);

    if (!key)
      throw createError({
        message: "You have to provide a key.",
        statusCode: 422,
      });
    if (key !== envKey)
      throw createError({ message: "Invalid key.", statusCode: 422 });

    const token = jwt.sign({}, jwtSecret, { expiresIn: jwtExpiresIn });

    return { token };
  });
}
