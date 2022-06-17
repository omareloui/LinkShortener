import { useConstants } from "~~/composables/useConstants";

export async function useTokenedFetch(...params: Parameters<typeof $fetch>) {
  const { JWT_NAME } = useConstants();

  const jwt = useCookie(JWT_NAME).value;

  const authorization = jwt ? `Bearer ${jwt}` : "";

  return $fetch(params[0], {
    ...params[1],
    headers: {
      ...params[1]?.headers,
      authorization,
    },
  });
}
