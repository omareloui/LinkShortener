export const MODALS = ["sign", "create-link"];
export type Modal = (typeof MODALS)[number];

const openModalState = ref<Modal | null>(null);

export function useOpenModalState(initialState: Modal | null = null) {
  openModalState.value = initialState;

  function setState(newState: Modal | null) {
    openModalState.value = newState;
  }

  return [readonly(openModalState), setState];
}
