<script setup lang="ts">
defineProps<{ isLoading?: boolean }>();

const emit = defineEmits(["submit"]);
</script>

<template>
  <form @submit.prevent="emit('submit')">
    <slot></slot>

    <InputSubmit class="submit" :is-loading="isLoading">
      <slot name="submit"></slot>
    </InputSubmit>
  </form>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *


form
  +grid($gap: 10px)
  // +w(max 600px)
  +mx(auto)

  +clr-bg(secondary)
  +clr-txt(invert)
  +float(2)

  +br-lg
  +pa(20px 15px)

  +lt-mobile
    +px(30px)


  .submit
    +mt(20px)
</style>
