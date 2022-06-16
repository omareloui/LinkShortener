import { isZodError, isH3Error, isError } from ".";

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

  if (isError(error)) throw createError(error);

  throw createError({
    message: `Unknown Error Type: ${error}`,
    statusCode: 500,
  });
}
