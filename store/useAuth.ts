import Cookie from "cookie-universal";
import { defineStore, acceptHMRUpdate } from "pinia";

import type { AccessToken } from "~~/@types";

import { useConstants } from "~~/composables/useConstants";
import { useGetSecondsFromString } from "~~/composables/useGetSecondsFromString";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isSigned: false,
  }),

  actions: {
    async sign(key: string) {
      const token = await $fetch("/api/auth/sing", {
        method: "POST",
        body: { key },
      });
      this.setToken(token);
    },

    setToken(token: AccessToken) {
      const cookies = Cookie();
      cookies.set(useConstants().JWT_NAME, token.body, {
        maxAge: useGetSecondsFromString(token.expiresIn),
      });
      if (token.body) this.isSigned = true;
      else this.isSigned = false;
    },

    signout() {
      this.setToken({ body: "", expiresIn: "0s" });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
