import { useGetErrorType } from "./useGetErrorType";

const getErrorType = useGetErrorType();

export function useGetErrorMessage() {
  return function getErrorMessage(e: unknown): string {
    if (getErrorType.isError(e)) return e.message;
    if (getErrorType.isFetchError(e)) return e.data.message;
    return "Unknown error message";
  };
}
