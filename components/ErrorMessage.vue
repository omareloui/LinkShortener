<template>
  <div class="error-message"><slot /></div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.error-message {
  color: var(--important);
  text-align: center;
  font-weight: bold;
}
</style>
