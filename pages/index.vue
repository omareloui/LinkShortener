<script setup lang="ts">
const [authState] = useAuthState();
</script>

<template>
  <Container tag="main">
    <Header />
    <SearchBar />
    <LinksList />
    <FloatingButton v-if="authState === 'is-authed'" />
  </Container>
  <ModalBase />
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

main {
  margin-top: 30px;

  display: grid;
  gap: 30px;
}
</style>
