import { defineStore, acceptHMRUpdate } from "pinia";
import { CreateLink, Link } from "~~/@types";

import { useSlugHelper } from "~~/composables/useSlugHelper";

export const useLinksStore = defineStore("links", {
  state: () => ({
    links: [] as Link[],
  }),

  getters: {},

  actions: {
    async fetchLinks() {
      const { data, error } = await useFetch("/api/links");
      if (error.value) return;
      this.links = data.value;
    },

    async create(body: CreateLink) {
      const slugHelper = useSlugHelper();

      body.slug &&= slugHelper.create(body.slug);

      const { data, error } = await useFetch("/api/create", {
        method: "POST",
        body,
      });

      if (error.value) {
        const { message } = error.value.data;
        throw new Error(message);
      }

      const newLink = data.value as Link;
      this.links.unshift(newLink);
    },

    async remove(link: Link) {
      const { data, error } = await useFetch(
        `/api/links/delete?id=${link._id}`,
        {
          method: "DELETE",
        }
      );

      const res = data.value as { ok: boolean };

      if (error.value || !res.ok)
        throw new Error("Something went wrong, please try again later.");

      this.links = this.links.filter(l => l._id !== link._id);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLinksStore, import.meta.hot));
}
