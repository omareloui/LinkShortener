import { LinkPojo, LinkForNotAuthed } from "types";

type Link = LinkPojo | LinkForNotAuthed;

const query = ref("");
const preview = reactive<{ links: Link[] }>({ links: [] });

export function useLinksStore() {
  const { $links, $refreshLinks } = useNuxtApp();

  async function refresh() {
    await $refreshLinks();
    setPreviewToLinksData();
  }

  function setPreviewToLinksData() {
    preview.links = $links.value as unknown as Link[];
  }

  function setQuery(newQuery: string) {
    query.value = newQuery;
    if (!query.value) setPreviewToLinksData();
    preview.links = ($links.value as Link[]).filter(x => {
      const regex = new RegExp(`${newQuery}`, "i");
      return x.url.match(regex) || x.slug.match(regex);
    });
  }

  async function removeLink(link: LinkPojo) {
    await useFetch(`/api/links/${link._id}`, { method: "DELETE" });
    await refresh();
  }

  async function createLink(link: { url: string; slug?: string }) {
    const { error } = await useFetch("/api/links", {
      method: "POST",
      body: JSON.stringify({ url: link.url, slug: link.slug }),
    });
    if (error.value) throw new Error(error.value.data.message);
    await refresh();
  }

  setPreviewToLinksData();
  return { preview, refresh, query: readonly(query), setQuery, removeLink, createLink };
}
