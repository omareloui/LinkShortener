<script setup lang="ts">
const [, setState] = useOpenModalState();

function openCreateLink() {
  return setState("create-link");
}
</script>

<template>
  <button class="floating-button" type="button" aria-label="Create link" @click="openCreateLink">
    <span class="content">
      <IconCreateLink />
    </span>
  </button>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.floating-button {
  --outside-container: (100% - var(--container-width)) / 2;

  @include size(80px);
  border-radius: 50%;
  border: 2px solid var(--cyan-opacified);
  position: fixed;
  bottom: 30px;
  right: max(var(--container-padding), calc(var(--outside-container) + var(--container-padding)));

  background: var(--gradient-primary-opacified);
  backdrop-filter: blur(5px);
  display: grid;
  place-items: center;
  outline: none;
  transition:
    border ease-in-out 200ms,
    box-shadow ease-in-out 200ms;
  cursor: pointer;

  &:hover,
  &:focus {
    border-color: var(--cyan);
    box-shadow: 3px 3px 30px 0px var(--cyan-opacified);
  }

  &:focus {
    outline: var(--text) dotted 2px;
    outline-offset: 3px;
  }

  .content {
    @include size(40%);
    margin-top: 7px;
    &::v-deep(svg) {
      @include size(100%);
    }
  }
}
</style>
