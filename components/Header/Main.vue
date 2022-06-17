<script setup lang="ts">
import { useAuthStore } from "~~/store/useAuth";
import { useLayoutStore } from "~~/store/useLayout";

const authStore = useAuthStore();
const layoutStore = useLayoutStore();
</script>

<template>
  <header>
    <div class="brand">
      <div class="logo-container">
        <Logo class="logo" />
      </div>

      <h1>omareloui links</h1>
    </div>
    <div class="sign" v-if="!authStore.isSigned">
      <ButtonBase
        is-normalized
        class="sign__button"
        @click="layoutStore.openSignForm"
        >Sign</ButtonBase
      >
    </div>
  </header>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *


header
  +flex($center: true, $space-between: true)
  +mb(20px)

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
  .sign
    +e(button)
      +brdr(text-main, 2px)
      +pa(4px 25px)
      +br-md
      +fs-base
      +clr-txt
      +tran(background, 200ms)
      &:hover
        +clr-bg(main, 0.2)
</style>
