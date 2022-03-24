<template>
  <header>
    <div class="brand">
      <div class="logo-container">
        <Logo class="logo" />
      </div>

      <h1>omareloui links</h1>
    </div>

    <!-- <ThemeToggleButton /> -->
  </header>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *


header
  +flex($center: true, $space-between: true)

  .brand
    +flex($gap: 5px)

    .logo-container
      +grid($center: true)

      .logo
        +w(55px)

    h1
      +fw-bold
      +fs-base
      +mt(5px)
      +no-wrap
</style>
