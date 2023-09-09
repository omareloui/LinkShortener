<script setup lang="ts">
const { preview, refresh } = await useLinksStore();
</script>

<template>
  <!-- <TransitionGroup name="links-preview" class="list" tag="div"> -->
  <div class="list">
    <LinkPreview v-for="link in preview.links" :key="link.slug" :link="link" @refresh-list="refresh"></LinkPreview>
  </div>
  <!-- </TransitionGroup> -->
</template>

<style lang="scss">
.list {
  display: grid;
  gap: 15px;
}
</style>
