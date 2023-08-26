<script setup lang="ts">
import { LinkForNotAuthed, LinkPojo } from "types";
defineProps<{ links: (LinkForNotAuthed | LinkPojo)[] }>();
</script>

<template>
  <TransitionGroup name="links-preview" tag="div" class="list">
    <LinkPreview v-for="link in links" :key="link.slug" :link="link"></LinkPreview>
  </TransitionGroup>
</template>

<style lang="scss">
.list {
  display: grid;
  gap: 15px;
}
</style>
