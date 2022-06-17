import { defineStore, acceptHMRUpdate } from "pinia";
import { CreateLink, Link, RequestError } from "~~/@types";

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
      this.links = data.value as Link[];
    },

    async create(input: CreateLink) {
      const requestBody: CreateLink = {
        url: input.url,
      };

      const slugHelper = useSlugHelper();

      if (input.slug) requestBody.slug = slugHelper.create(input.slug);

      const { data, error } = await useFetch("/api/links", {
        method: "POST",
        body: requestBody,
      });

      if (error.value) {
        let message: string;

        if (error.value === true)
          message = "You have to change something and try again!";
        else message = (error.value as RequestError).data.message;

        throw new Error(message);
      }

      const newLink = data.value as Link;
      this.links.unshift(newLink);
    },

    async remove(link: Link) {
      const { data, error } = await useFetch(`/api/links/${link._id}`, {
        method: "DELETE",
      });

      const res = data.value as { ok: boolean };

      if (error.value || !res.ok) throw error.value;

      this.links = this.links.filter(l => l._id !== link._id);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLinksStore, import.meta.hot));
}
