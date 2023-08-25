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
  },
) {
  const removeList = useSlugRemoveList();
  const { ALL_MAPS, SPECIFIC_MAPS } = useSlugLanguagesMap();

  class SlugHelper {
    public map: Record<string, string> = {};

    public chars: string[] = [];

    public regex: RegExp;

    constructor(public slugOptions: SlugOptions) {
      const locale = slugOptions.getLocalFromMeta
        ? document?.querySelector('meta[name="backend-locale"]')?.getAttribute("content")
        : undefined;

      type SpecifiedMapKey = keyof typeof SPECIFIC_MAPS;

      if (locale && typeof SPECIFIC_MAPS[locale as SpecifiedMapKey] === "object")
        ALL_MAPS.push(SPECIFIC_MAPS[locale as SpecifiedMapKey]);

      for (let i = 0; i < ALL_MAPS.length; i += 1) {
        const lookup = ALL_MAPS[i];

        Object.keys(lookup).forEach(c => {
          if (Object.prototype.hasOwnProperty.call(lookup, c)) {
            this.map[c] = lookup[c];
          }
        });
      }

      Object.keys(this.map).forEach(k => {
        if (Object.prototype.hasOwnProperty.call(this.map, k)) this.chars.push(k);
      });

      this.regex = new RegExp(this.chars.join("|"), "g");
    }

    private removeStopWords(string: string) {
      if (this.slugOptions.removeStopWords !== true) return string;

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
