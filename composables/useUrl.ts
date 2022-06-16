import type { Link } from "~~/@types";

export function useUrl(linkOrSlug: Link | string) {
  let slug: string;
  if (typeof linkOrSlug === "string") slug = linkOrSlug;
  else slug = linkOrSlug.slug;
  return `/${slug}?s=links`;
}
