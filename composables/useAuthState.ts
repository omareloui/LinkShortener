type AuthState = "is-authed" | "not-authed";

const authState = ref<AuthState>("not-authed");

export function useAuthState(initialState?: AuthState) {
  if (initialState) authState.value = initialState;

  function setState(newState: AuthState) {
    authState.value = newState;
  }

  return [readonly(authState), setState] as const;
}
