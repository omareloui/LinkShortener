<template>
  <div class="layouts-wrapper">
    <slot></slot>
  </div>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *

.layouts-wrapper
  +py(20px)
</style>
