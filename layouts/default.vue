<template>
  <div class="layout">
    <slot></slot>
    <Notify />
  </div>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *

.layout
  +py(20px)
</style>
