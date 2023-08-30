<script setup lang="ts">
defineEmits<{ (e: "openSignModal"): void }>();
</script>

<template>
  <header>
    <div class="brand">
      <Logo />
      <h1>omareloui links</h1>
    </div>
    <div class="sign-button">
      <ButtonBase @click="$emit('openSignModal')">Sign</ButtonBase>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

header {
  display: flex;
  justify-content: space-between;

  .brand {
    display: flex;
    gap: 10px;
    place-items: center;

    h1 {
      font-size: 1.1rem;
    }
    ::v-deep(svg) {
      @include size(52px 31px);
    }
  }
}
</style>
