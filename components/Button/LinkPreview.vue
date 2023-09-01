<script setup lang="ts">
defineProps<{ helpTip?: string }>();
defineEmits<{ (e: "click"): void }>();
</script>

<template>
  <button type="button" @click="$emit('click')">
    <slot></slot>
    <span class="help-tip" v-if="helpTip">{{ helpTip }}</span>
  </button>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

button {
  --size: 23px;

  position: relative;
  background: none;
  outline: none;
  border: none;
  display: grid;
  place-items: center;
  cursor: pointer;
  @include size(var(--size));

  ::v-deep(svg) {
    @include size(100%);
  }

  span {
    position: absolute;
    top: -38px;
    font-size: 1rem;
    background: var(--blur-surface1);
    backdrop-filter: blur(4px);
    padding: 5px 10px;
    border-radius: 5px;
    text-transform: capitalize;
    font-weight: bold;
    color: var(--subtext0);
    pointer-events: none;
    touch-action: none;
    opacity: 0;
    translate: 0 10px;
    transition: ease-in-out 300ms;
  }

  &:focus {
    outline: 2px dotted var(--subtext0);
    outline-offset: 2px;
    border-radius: 3px;
  }

  &:focus,
  &:hover {
    span {
      translate: 0 0;
      opacity: 1;
    }
  }
}
</style>
