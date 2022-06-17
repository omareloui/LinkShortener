import { RequestError } from "~~/@types";

export function useGetErrorType() {
  function getName(e: unknown) {
    const isObj = e !== null && typeof e === "object";
    const hasName = isObj && "name" in e;
    const name = hasName && (e as { name: string }).name;
    return name;
  }

  function isError(e: unknown): e is Error {
    return getName(e) === "Error";
  }

  function isFetchError(e: unknown): e is RequestError {
    return getName(e) === "FetchError";
  }

  return {
    isError,
    isFetchError,
  };
}
