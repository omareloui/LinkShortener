<script setup lang="ts">
function redirect() {
  const route = useRoute();
  const { slug } = route.params;
  location.replace(`/api/visit?slug=${slug}`);
}

// onBeforeMount(redirect);
</script>

<template>
  <main>
    <div class="logo"><Logo no-color /></div>
    <div class="text">Redirecting</div>
  </main>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *

main
  --primary-gradient: linear-gradient(90deg, var(--clr-primary) 0%, var(--clr-secondary) 100%)

  +pos-r
  +h(min 100vh)
  +grid($center: true)
  background: var(--primary-gradient)

  .logo
    +w(50vw)
    +center
    ::v-deep(svg)
      +clr(primary, fill, 0.5)

  .text
    --dot-size: 9px
    --dots-gap: 5px

    --second-dot-offset: calc(var(--dot-size) + var(--dots-gap))
    --third-dot-offset: calc((var(--dot-size) + var(--dots-gap)) * 2)

    isolation: isolate
    +pos-r
    +clr-txt(light)
    +fs-5xl
    +fw-bold

    &::after
      content: ''
      +size(var(--dot-size))
      +br-cr
      +pos-a(bottom 18px right -12px)
      background: currentColor
      animation: load 1s linear infinite


@keyframes load
  0%
    box-shadow: var(--second-dot-offset) 0 hsl(var(--clr-hs-text-light) var(--clr-l-text-light)/var(--clr-o-0)), var(--third-dot-offset) 0 hsl(var(--clr-hs-text-light) var(--clr-l-text-light)/var(--clr-o-0))
  50%
    box-shadow: var(--second-dot-offset) 0 hsl(var(--clr-hs-text-light) var(--clr-l-text-light)/var(--clr-o-100)), var(--third-dot-offset) 0 hsl(var(--clr-hs-text-light) var(--clr-l-text-light)/var(--clr-o-0))
  100%
    box-shadow: var(--second-dot-offset) 0 hsl(var(--clr-hs-text-light) var(--clr-l-text-light)/var(--clr-o-100)), var(--third-dot-offset) 0 hsl(var(--clr-hs-text-light) var(--clr-l-text-light)/var(--clr-o-100))
</style>
