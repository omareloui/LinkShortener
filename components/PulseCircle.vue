<script setup lang="ts">
const { color, size, inset } = withDefaults(
  defineProps<{ color: "var(--purple)" | "var(--magenta)" | "var(--cyan)"; size?: string; inset?: string }>(),
  { size: "100px", inset: "0 0" },
);
</script>

<template>
  <div class="circle"></div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.circle {
  position: absolute;
  inset: v-bind("inset");
  border-radius: 50%;
  @include w(v-bind("size"));
  aspect-ratio: 1;
  background-color: v-bind("color");
  translate: -50% -50%;
  animation: pulse 3s infinite linear alternate;
}

@keyframes pulse {
  to {
    scale: 0.8;
  }
}
</style>
