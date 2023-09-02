import jwt from "jsonwebtoken";

import { config } from "~~/server/config";

function verify(token: string) {
  try {
    return !!jwt.verify(token, config.jwtSecret);
  } catch (e) {
    return false;
  }
}

export default eventHandler(event => {
  const { context } = event;
  const accessCookie = getCookie(event, config.accessTokenName);

  if (accessCookie) {
    const token = accessCookie.split(" ")[1];
    const isValid = verify(token);
    if (isValid) context.isAuthed = true;
  }
});
