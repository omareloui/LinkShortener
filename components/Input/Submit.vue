<template>
  <ButtonBase type="submit">
    <slot></slot>
  </ButtonBase>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *

[type="submit"]
  --primary-gradient: linear-gradient(90deg, var(--clr-primary), var(--clr-secondary))

  +flex($gap: 10px, $center: true)
  justify-content: center

  border: none
  background: var(--primary-gradient)
  +clr-txt(light)

  +pa(12px)

  +br-lg
  +fw-bold
  +fs-base
  +ff(main)

  ::v-deep(svg)
    +size(25px)
</style>
