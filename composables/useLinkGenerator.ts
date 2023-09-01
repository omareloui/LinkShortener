import type { LinkPojo, LinkForNotAuthed } from "types";

export function useLinkGenerator(
  linkOrSlug: LinkForNotAuthed | LinkPojo | string,
  options: { source?: string; slugOnly?: boolean } = { source: "links", slugOnly: false },
) {
  let slug: string;
  if (typeof linkOrSlug === "string") slug = linkOrSlug;
  else slug = linkOrSlug.slug;
  slug = `${slug}?s=${options.source || "links"}`;
  if (options.slugOnly) return slug;
  const origin = location.origin;
  return { origin, slug, url: `${origin}/${slug}` };
}
