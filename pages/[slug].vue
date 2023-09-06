<script setup lang="ts">
useHead({ title: "Redirecting | Omar Eloui Links" });

async function redirect() {
  const route = useRoute();
  const { slug } = route.params;
  const { s, source } = route.query;

  let link = `/api/visit/${slug}`;
  if (s || source) link += `?source=${s || source}`;

  try {
    const url = await $fetch(link);
    window.location.replace(url as string);
  } catch {}
}

onBeforeMount(redirect);
</script>

<template>
  <div class="redirect-container">
    <PulseCircle color="var(--magenta)" inset="0 auto auto 95%" size="max(300px, 40%)" />
    <PulseCircle color="var(--purple)" inset="5% auto auto 5%" size="max(420px, 35%)" />
    <PulseCircle color="var(--cyan)" inset="100% auto auto 50%" size="max(500px, 50%)" />
    <main>
      <div class="content">
        <div class="logo">
          <Logo color="var(--blur-invert-surface0)" />
        </div>
        <h1 class="text">Redirecting</h1>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.redirect-container {
  position: relative;
  overflow: hidden;
  @include size(100dvw 100dvh);

  main {
    @include size(100%);
    backdrop-filter: blur(50px);
    @include h(100dvh);
    display: grid;
    place-items: center;

    @include tablet-up {
      backdrop-filter: blur(150px);
    }

    .content {
      display: grid;
      place-items: center;
      gap: 35px;
    }

    .logo {
      @include w(clamp(300px, 45vw, 600px));
    }

    .text {
      --dot-size: 8px;

      isolation: isolate;
      font-weight: bold;
      font-size: clamp(2.25rem, 7vw, 3rem);
      line-height: clamp(3.1rem, 9.8vw, 4.25rem);
      transform: translateX(calc((var(--dot-size) + var(--dot-size)) * -1));

      @include dot-load-animation(var(--dot-size), 5px, auto -12px 13px auto);
    }
  }
}
</style>
