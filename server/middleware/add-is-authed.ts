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
  const token = (context.req.headers.authorization as string | undefined)?.split("Bearer ")[1];

  if (token) {
    const isValid = verify(token);
    if (isValid) context.isAuthed = true;
  }
});
