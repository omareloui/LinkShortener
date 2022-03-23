<script setup lang="ts">
const props = withDefaults(
  defineProps<{ modelValue: string; isLarge?: boolean }>(),
  { isLarge: false }
);

const emit = defineEmits(["update:modelValue", "input"]);

const content = useModelWrapper(props, emit);
</script>

<template>
  <input type="text" v-model="content" @input="emit('input')" />
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *

input
  +brdr(none)
  +clr-bg(input-bg)
  +br-lg
  +pa(8px 10px)
  +block
  +w(100%)

  &.large
    +fs-lg
    +fw-bold
</style>
