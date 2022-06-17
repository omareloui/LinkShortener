import type { CompatibilityEvent } from "h3";

export function hasToBeAuthenticated(event: CompatibilityEvent) {
  if (!event.context.isAuthed)
    throw createError({
      message: "You have to be authenticated.",
      statusCode: 401,
    });
}
