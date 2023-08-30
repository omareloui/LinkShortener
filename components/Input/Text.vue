<script setup lang="ts">
import InputBase from "./Base.vue";

defineProps<{ modelValue: string; placeholder?: string; name: string; label: string }>();
defineEmits<{ (e: "update:modelValue", value: string): void }>();

function getValue(e: Event) {
  return (e.target as EventTarget & { value: string }).value;
}

const inputElement = ref<InstanceType<typeof InputBase> | null>(null);

function focus() {
  inputElement.value?.focus();
}

defineExpose({ focus });
</script>

<template>
  <InputBase ref="inputElement" type="text" v-bind="$props" @input="$emit('update:modelValue', getValue($event))" />
</template>
