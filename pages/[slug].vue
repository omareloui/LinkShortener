<script setup lang="ts">
definePageMeta({ layout: false });

onBeforeMount(redirect);

function redirect() {
  const route = useRoute();
  const { slug } = route.params;
  const { s } = route.query;

  let link = `/api/visit?slug=${slug}`;
  if (s) link += `&source=${s}`;

  location.replace(link);
}
</script>

<template>
  <main>
    <div class="logo"><Logo no-color /></div>
    <h1 class="text">Redirecting</h1>
  </main>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *

main
  --primary-gradient: linear-gradient(90deg, var(--clr-primary), var(--clr-secondary))

  +pos-r
  +h(100vh)
  +grid($center: true)
  background: var(--primary-gradient)

  .logo
    +w(50vw)
    +center
    ::v-deep(svg)
      +clr(light, fill, 0.08)

  .text
    --dot-size: 8px
    --dots-gap: 5px

    --second-dot-offset: calc(var(--dot-size) + var(--dots-gap))
    --third-dot-offset: calc((var(--dot-size) + var(--dots-gap)) * 2)

    isolation: isolate
    +pos-r
    +clr-txt(light)
    +fs-4xl
    +fw-bold
    transform: translateX(calc((var(--dot-size) + var(--dot-size)) * -1))

    &::after
      content: ''
      +size(var(--dot-size))
      +br-cr
      +pos-a(bottom 13px right -12px)
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
