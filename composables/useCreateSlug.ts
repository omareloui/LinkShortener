import { useSlugLanguagesMap } from "./useSlugLanguagesMap";
import { useSlugRemoveList } from "./useSlugRemoveList";

interface UseCreateSlugOptions {
  removeStopWords?: boolean;
}

export function useCreateSlug(
  input: string,
  options: UseCreateSlugOptions = { removeStopWords: true }
) {
  const removeList = useSlugRemoveList();
  const { ALL_MAPS, SPECIFIC_MAPS } = useSlugLanguagesMap();

  class Slug {
    public map: Record<string, string> = {};
    public chars: string[] = [];
    public regex: RegExp;

    public slug?: string;

    constructor(public input: string, public options: UseCreateSlugOptions) {
      const locale = document
        .querySelector('meta[name="backend-locale"]')
        ?.getAttribute("content");

      if (typeof SPECIFIC_MAPS[locale] === "object")
        ALL_MAPS.push(SPECIFIC_MAPS[locale]);

      for (let i = 0; i < ALL_MAPS.length; i++) {
        var lookup = ALL_MAPS[i];

        for (const c in lookup) {
          if (lookup.hasOwnProperty(c)) {
            this.map[c] = lookup[c];
          }
        }
      }

      for (const k in this.map) {
        if (this.map.hasOwnProperty(k)) this.chars.push(k);
      }

      this.regex = new RegExp(this.chars.join("|"), "g");
    }

    private removeStopWords(string: string) {
      if (this.options.removeStopWords !== true) return string;

      const regex = new RegExp(`\b(${removeList.join("|")})\b`, "gi");
      return string.replace(regex, "");
    }

    public create() {
      this.slug = this.input.replace(this.regex, m => this.map[m]);

      this.slug = this.removeStopWords(this.slug)
        .replace(/[^-\w\s]/g, "")
        .replace(/[-\s]+/g, "-")
        .toLowerCase()
        .trim();
    }
  }

  const slug = new Slug(input, options);
  slug.create();

  return slug.slug;
}
