<script setup lang="ts">
import { LinkForNotAuthed, LinkPojo } from "types";

const { preview, refresh } = await useLinksStore();
</script>

<template>
  <TransitionGroup name="links-preview" tag="div" class="list">
    <LinkPreview v-for="link in preview.links" :key="link.slug" :link="link" @refresh-list="refresh"></LinkPreview>
  </TransitionGroup>
</template>

<style lang="scss">
.list {
  display: grid;
  gap: 15px;
}
</style>
