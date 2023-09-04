<script setup lang="ts">
import InputBase from "./Base.vue";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  name: string;
  label: string;
  required?: boolean;
  noAutoComplete?: boolean;
}>();
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const inputElement = ref<InstanceType<typeof InputBase> | null>(null);

function focus() {
  inputElement.value?.focus();
}

const content = useModelWrapper(props, emit);

defineExpose({ focus });
</script>

<template>
  <InputBase
    v-model="content"
    ref="inputElement"
    type="text"
    v-bind="{
      placeholder,
      name,
      label,
      required,
      noAutoComplete,
    }"
  />
</template>
