import type { Link } from "~~/@types";

export function useClicksCounter() {
  return (link: Link) => {
    let notTracked = link.visits?.length || 0;

    let result = "";

    const addToResult = (key: string, value: number) => {
      result += `${key}: ${value} click${value > 1 ? "s" : ""}.\n`;
    };

    if (link.visits) {
      const sources: Record<string, number> = {};

      link.visits.forEach(v => {
        if (!v.source) return;
        sources[v.source] ||= 0;
        sources[v.source] += 1;
      });

      Object.entries(sources).forEach(([key, value]) => {
        addToResult(key, value);
        notTracked -= value;
      });
    }

    if (notTracked > 0) addToResult("Not Tracked", notTracked);
    return result;
  };
}
