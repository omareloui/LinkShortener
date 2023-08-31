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
  const { context, node } = event;
  const accessCookie = node.req.headers.cookie?.split(";").find(x => x.match(/^access_token/));

  if (accessCookie) {
    const token = decodeURI(accessCookie.split("=")[1]).split(" ")[1];
    const isValid = verify(token);
    if (isValid) context.isAuthed = true;
  }
});
