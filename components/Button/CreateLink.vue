<script setup lang="ts">
const emit = defineEmits(["open"]);

function open() {
  emit("open");
}
</script>

<template>
  <ButtonBase is-normalized @click="open" class="create-link-button">
    <span class="create-link-button__text">Create Link</span>
  </ButtonBase>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *

.create-link-button
  +clr-bg(light, $important: true)
  +pa(12px)
  +br-lg
  +w(max 260px)
  +w(100%)
  +center-text
  +fs-xl
  +fw-bold

  +e(text)
    background: var(--primary-gradient)
    background-clip: text
    -webkit-text-fill-color: transparent
</style>
