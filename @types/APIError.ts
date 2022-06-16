export interface RequestError extends Error {
  data: {
    message: string;
  };
}
