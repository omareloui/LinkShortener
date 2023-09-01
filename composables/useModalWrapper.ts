export function useModelWrapper<Props extends { modelValue: string }>(
  props: Props,
  emit: (e: "update:modelValue", ...args: any[]) => void,
) {
  return computed({
    get: () => props.modelValue,
    set: value => emit("update:modelValue", value),
  });
}
