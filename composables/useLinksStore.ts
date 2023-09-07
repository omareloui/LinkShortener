import { LinkPojo, LinkForNotAuthed } from "types";

type Link = LinkPojo | LinkForNotAuthed;

const query = ref("");
const preview = reactive<{ links: Link[] }>({ links: [] });

export async function useLinksStore() {
  const { data, refresh: _refresh } = await useFetch("/api/links");

  async function refresh() {
    await _refresh();
    setPreviewToLinksData();
  }

  function setPreviewToLinksData() {
    preview.links = data.value as unknown as Link[];
  }

  function setQuery(newQuery: string) {
    query.value = newQuery;
    if (!query.value) setPreviewToLinksData();
    preview.links = (data.value as Link[]).filter(x => x.url.match(newQuery) || x.slug.match(newQuery));
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
