<script setup lang="ts">
const { $isAuthed } = useNuxtApp();

defineEmits<{ (e: "openSignModal"): void }>();

async function signout() {
  await useFetch("/api/auth/signout", { method: "POST" });
  location.href = location.origin;
}
</script>

<template>
  <header>
    <div class="brand">
      <Logo />
      <h1><NuxtLink to="/">omareloui links</NuxtLink></h1>
    </div>
    <div class="sign-button">
      <ButtonBase @click="signout" v-if="$isAuthed">Signout</ButtonBase>
      <ButtonBase @click="$emit('openSignModal')" v-else>Sign in</ButtonBase>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

header {
  display: flex;
  justify-content: space-between;

  .brand {
    display: flex;
    gap: 10px;
    place-items: center;

    h1 {
      font-size: 1.1rem;
      a {
        text-decoration: none;
        &:focus {
          outline: 2px dotted var(--subtext0);
          outline-offset: 2px;
          border-radius: 2px;
        }
      }
    }
    ::v-deep(svg) {
      @include size(52px 31px);
    }
  }
}
</style>
