const [openModalState, setOpenModalState] = useOpenModalState();
const [authState] = useAuthState();

export function useShortCuts() {
  onMounted(searchFocus);
  onBeforeMount(init);
  onBeforeUnmount(onDestroy);
}

function searchFocus() {
  document.getElementById("search")?.focus();
}

function isActiveOnInput() {
  const activeTagName = document.activeElement?.tagName;
  return activeTagName && ["INPUT", "TEXTAREA"].includes(activeTagName);
}

function onKeyup(e: KeyboardEvent) {
  if (openModalState.value || isActiveOnInput()) return;
  if (e.code === "Slash") searchFocus();

  if (authState.value === "not-authed") return;

  if (e.code === "KeyN") setOpenModalState(MODALS[1]);
}

function init() {
  addEventListener("keyup", onKeyup);
}

function onDestroy() {
  removeEventListener("keyup", onKeyup);
}
