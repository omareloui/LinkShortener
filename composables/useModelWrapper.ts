export function useModelWrapper<Props extends { modelValue: string }>(
  props: Props,
  emit: (event: "update:modelValue", ...args: unknown[]) => void
) {
  return computed({
    get: () => props.modelValue,
    set: value => emit("update:modelValue", value),
  });
}
