import { defineStore, acceptHMRUpdate } from "pinia";
import { CreateLink, Link, RequestError } from "~~/@types";

import { useSlugHelper } from "~~/composables/useSlugHelper";
import { useTokenedFetch } from "~~/composables/useTokenedFetch";

export const useLinksStore = defineStore("links", {
  state: () => ({
    links: [] as Link[],
  }),

  getters: {},

  actions: {
    async fetchLinks() {
      const { data, error } = await useFetch("/api/links");
      if (error.value) return;
      this.links = data.value as Link[];
    },

    async create(input: CreateLink) {
      const requestBody: CreateLink = {
        url: input.url,
      };

      const slugHelper = useSlugHelper();

      if (input.slug) requestBody.slug = slugHelper.create(input.slug);

      const link = (await useTokenedFetch("/api/links", {
        method: "POST",
        body: requestBody,
      })) as Link;

      this.links.unshift(link);
    },

    async remove(link: Link) {
      const res = (await useTokenedFetch(`/api/links/${link._id}`, {
        method: "DELETE",
      })) as { ok: boolean };

      if (!res.ok)
        throw new Error("Something went wrong, please try again later.");

      this.links = this.links.filter(l => l._id !== link._id);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLinksStore, import.meta.hot));
}
