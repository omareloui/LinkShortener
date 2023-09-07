export const MODALS = ["sign", "create-link"] as const;
export type Modal = (typeof MODALS)[number];

const openModalState = ref<Modal | null>(null);

function setState(newState: Modal | null) {
  openModalState.value = newState;
}

export function useOpenModalState(initialState: Modal | null = null) {
  if (initialState === null || MODALS.includes(initialState)) setState(initialState);
  return [openModalState, setState] as const;
}
