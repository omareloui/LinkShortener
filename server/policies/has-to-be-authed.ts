import type { H3Event } from "h3";

export function hasToBeAuthenticated({ context }: H3Event) {
  if (!context.isAuthed)
    throw createError({
      message: "You have to be authenticated.",
      statusMessage: "Unauthorized",
      statusCode: 401,
    });
}
