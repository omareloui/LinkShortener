import { createError, type H3Error } from "h3";
import type { ZodError } from "zod";

export function isZodError(e: unknown): e is ZodError {
  return e !== null && typeof e === "object" && "name" in e && e.name === "ZodError";
}

export function isH3Error(e: unknown): e is H3Error {
  return e !== null && typeof e === "object" && "name" in e && (e as { name?: string }).name === "H3Error";
}

export function isNormalError(e: unknown): e is Error {
  return e !== null && typeof e === "object" && "name" in e && (e as { name?: string }).name === "Error";
}

export function errorHandler(error: unknown): never {
  if (isZodError(error))
    throw createError({
      message: error.message,
      statusCode: 422,
      statusMessage: "Unprocessable Entity",
    });

  if (isH3Error(error) || isNormalError(error)) throw createError(error);

  throw createError({
    message: `Unknown Error Type: ${error}`,
    statusCode: 500,
    statusMessage: "Internal Server Error",
  });
}
