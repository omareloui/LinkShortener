<script setup lang="ts">
useHead({ title: "Redirecting | Omar Eloui Links" });

definePageMeta({ layout: false });

async function redirect() {
  const route = useRoute();
  const { slug } = route.params;
  const { s, source } = route.query;

  let link = `/api/visit/${slug}`;
  if (s || source) link += `?source=${s || source}`;

  const url = await $fetch(link);

  window.location.replace(url as string);
}

onBeforeMount(redirect);
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
