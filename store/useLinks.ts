import { defineStore, acceptHMRUpdate } from "pinia";
import { CreateLink, Link } from "~~/@types";

import { useSlugHelper } from "~~/composables/useSlugHelper";
import { useTokenedFetch } from "~~/composables/useTokenedFetch";

export const useLinksStore = defineStore("links", {
  state: () => ({
    links: [] as Link[],
    preview: [] as Link[],
  }),

  actions: {
    async fetchLinks() {
      const { data, error } = await useFetch("/api/links");
      if (error.value) return;
      this.links = data.value as Link[];
      this.preview = this.links;
    },

    search(query: string) {
      if (!query) {
        this.preview = this.links;
        return;
      }
      this.preview = this.links.filter(
        l => l.url.split("//")[1].match(query) || `/${l.slug}`.match(query)
      );
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
      this.preview = this.links;
    },

    async remove(link: Link) {
      const res = (await useTokenedFetch(`/api/links/${link._id}`, {
        method: "DELETE",
      })) as { ok: boolean };

      if (!res.ok)
        throw new Error("Something went wrong, please try again later.");

      this.links = this.links.filter(l => l._id !== link._id);
      this.preview = this.links;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLinksStore, import.meta.hot));
}
