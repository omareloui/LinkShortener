export function useIsError() {
  return function isError(e: unknown): e is Error {
    return (
      e !== null &&
      typeof e === "object" &&
      (e as { name?: string }).name === "Error"
    );
  };
}
