<script setup lang="ts">
const { preview, refresh } = useLinksStore();
</script>

<template>
  <TransitionGroup name="links-preview" class="list" tag="div">
    <LinkPreview v-for="link in preview.links" :key="link.slug" :link="link" @refresh-list="refresh"></LinkPreview>
  </TransitionGroup>
</template>

<style lang="scss">
.list {
  display: grid;
  gap: 15px;
  margin-bottom: 20px;
}
</style>
