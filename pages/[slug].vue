<script setup lang="ts">
useMeta({ title: "Redirecting | Omar Eloui Links" });

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
  +pos-r
  +h(100vh)
  +grid($center: true)

  .logo
    +w(50vw)
    +center
    ::v-deep(svg)
      +clr(light, fill, 0.08)

  .text
    --dot-size: 8px

    isolation: isolate
    +clr-txt(light)
    +fs-4xl
    +fw-bold
    transform: translateX(calc((var(--dot-size) + var(--dot-size)) * -1))

    +dot-load-animation(var(--dot-size), 5px, bottom 13px right -12px)
</style>
