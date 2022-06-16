import { defineStore, acceptHMRUpdate } from "pinia";

export const useLayoutStore = defineStore("layout", {
  state: () => ({
    isSignFormOpen: false,
  }),

  actions: {
    openSignForm() {
      this.isSignFormOpen = true;
    },

    closeSignForm() {
      this.isSignFormOpen = false;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot));
}
