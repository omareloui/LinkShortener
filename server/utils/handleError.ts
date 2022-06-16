import { isZodError, isH3Error } from ".";

export function handlerError(error: unknown): never {
  if (isZodError(error))
    throw createError({
      message: error.message,
      statusCode: 404,
    });

  if (isH3Error(error))
    throw createError({
      ...error,
    });

  throw createError({
    message: `${error}`,
    statusCode: 500,
  });
}
