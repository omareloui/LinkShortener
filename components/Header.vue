<script setup lang="ts">
const [authState, setAuthState] = useAuthState();
const [, setModalState] = useOpenModalState();

function openSignModal() {
  return setModalState("sign");
}

async function signout() {
  await useFetch("/api/auth/signout", { method: "POST" });
  setAuthState("not-authed");
}
</script>

<template>
  <header>
    <div class="brand">
      <Logo />
      <h1><NuxtLink to="/">omareloui links</NuxtLink></h1>
    </div>
    <div class="sign-button">
      <ButtonBase @click="signout" v-if="authState === 'is-authed'">Signout</ButtonBase>
      <ButtonBase @click="openSignModal" v-else>Sign in</ButtonBase>
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
