import { defineStore, acceptHMRUpdate } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isSigned: false,
  }),

  actions: {
    async sign(key: string) {
      const { token } = await $fetch("/api/auth/sing", {
        method: "POST",
        body: { key },
      });
      // TODO: save the token
      this.isSigned = true;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
