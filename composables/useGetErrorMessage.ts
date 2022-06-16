import { useIsError } from "./useIsError";

const isError = useIsError();

export function useGetErrorMessage() {
  return function getErrorMessage(e: unknown): string {
    if (!isError(e)) return "Unknown error message";
    return e.message;
  };
}
