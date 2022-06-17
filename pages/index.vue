<script setup lang="ts">
import { useAuthStore } from "~~/store/useAuth";

const authStore = useAuthStore();

useHead({ title: "Omar Eloui Links" });
</script>

<template>
  <Container>
    <HeaderMain />

    <main>
      <FormSign />

      <section v-if="authStore.isSigned">
        <FormCreateLink />
      </section>

      <PreviewLinks />
    </main>
  </Container>
</template>
