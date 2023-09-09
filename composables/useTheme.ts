const THEMES = ["dark", "light", "auto"] as const;

type ThemeState = (typeof THEMES)[number];

export function useTheme() {
  listenForSystemColorSchemeChange();
  loadFromSystemTheme();
  return { setTheme };
}

function getSystemTheme(): Exclude<ThemeState, "auto"> {
  const isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDark ? "dark" : "light";
}

function setTheme(theme: ThemeState) {
  const rootEl = document.querySelector("html") as HTMLHtmlElement;
  const systemTheme = getSystemTheme();
  if (theme === "auto") setTheme(systemTheme);
  else if (theme === "light") rootEl.setAttribute("theme", "");
  else rootEl.setAttribute("theme", theme);
  updateFavicon(theme === "auto" ? systemTheme : theme);
}

function getFromSystemColorScheme(): Exclude<ThemeState, "auto"> {
  const isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (isDark) return "dark";
  return "light";
}

function loadFromSystemTheme() {
  setTheme(getFromSystemColorScheme());
}

function listenForSystemColorSchemeChange() {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    setTheme(e.matches ? "dark" : "light");
  });
}

function updateFavicon(state: ThemeState) {
  const favicon = document.querySelector("link[rel='icon']");
  const linkEl = document.createElement("link");
  const { head } = document;
  linkEl.setAttribute("rel", "icon");
  linkEl.setAttribute("type", "image/svg+xml");
  if (state === "light") linkEl.setAttribute("href", "/images/favicon-light.svg");
  else linkEl.setAttribute("href", "/images/favicon-dark.svg");
  head.removeChild(favicon as HTMLElement);
  head.appendChild(linkEl);
}
