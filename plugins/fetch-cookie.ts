import type { AccessToken } from "~~/@types";

import { useTokenedFetch } from "~~/composables/useTokenedFetch";
import { useAuthStore } from "~~/store/useAuth";

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();

  let shouldRemoveTokens = false;

  try {
    const token = (await useTokenedFetch(
      "/api/auth/refresh-token"
    )) as Partial<AccessToken>;

    if (!token.body || !token.expiresIn) return;

    authStore.setToken(token as AccessToken);
  } catch (e) {
    shouldRemoveTokens = true;
  }

  if (process.client && shouldRemoveTokens) {
    authStore.signout();
  }
});
