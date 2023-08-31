import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ms from "ms";
import { H3Event, EventHandlerRequest } from "h3";

import { config } from "~~/server/config";
import { SignDto } from "../validate";
import { errorHandler } from "../utils";

const { hashedKey, jwtSecret, jwtExpiresIn: expiresIn, accessTokenName } = config;

class AuthController {
  sign = eventHandler(async event => {
    try {
      const { key } = SignDto.parse(await readBody(event));
      const keyMatch = await bcrypt.compare(key, hashedKey);
      if (!keyMatch)
        throw createError({ message: "Invalid key.", statusCode: 422, statusMessage: "Unprocessable Entity" });
      this.setAccessToken(event);
      return { success: true };
    } catch (e) {
      errorHandler(e);
    }
  });

  isAuthed = eventHandler(event => !!event.context.isAuthed);

  refreshToken = eventHandler(event => {
    const { context } = event;
    if (!context.isAuthed)
      throw createError({ message: "You have to be authenticated", statusCode: 401, statusMessage: "Unauthorized" });
    const token = jwt.sign({}, jwtSecret, { expiresIn });
    this.setAccessToken(event);
    return { token, expiresIn };
  });

  signout = eventHandler(event => this.removeAccess(event));

  private removeAccess(event: H3Event<EventHandlerRequest>) {
    return setCookie(event, accessTokenName, "", { maxAge: 0, httpOnly: true });
  }

  private setAccessToken(event: H3Event<EventHandlerRequest>) {
    const maxAge = ms(expiresIn) / 1000;
    const token = jwt.sign({}, jwtSecret, { expiresIn });
    return setCookie(event, accessTokenName, `Bearer ${token}`, { maxAge, httpOnly: true });
  }
}

export const authController = new AuthController();
