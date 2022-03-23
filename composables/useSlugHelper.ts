import { useSlugLanguagesMap } from "./useSlugLanguagesMap";
import { useSlugRemoveList } from "./useSlugRemoveList";

interface SlugOptions {
  removeStopWords?: boolean;
  getLocalFromMeta?: boolean;
}

export function useSlugHelper(
  options: SlugOptions = {
    removeStopWords: false,
    getLocalFromMeta: false,
  }
) {
  const removeList = useSlugRemoveList();
  const { ALL_MAPS, SPECIFIC_MAPS } = useSlugLanguagesMap();

  class SlugHelper {
    public map: Record<string, string> = {};
    public chars: string[] = [];
    public regex: RegExp;

    constructor(public options: SlugOptions) {
      const locale = options.getLocalFromMeta
        ? document
            ?.querySelector('meta[name="backend-locale"]')
            ?.getAttribute("content")
        : undefined;

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

    public create(input: string) {
      const slug = input.replace(this.regex, m => this.map[m]);

      return this.removeStopWords(slug)
        .replace(/[^-\w\s]/g, "")
        .replace(/[-\s]+/g, "-")
        .toLowerCase()
        .trim();
    }
  }

  return new SlugHelper(options);
}
