<script setup lang="ts">
import { LinkForNotAuthed, LinkPojo } from "types";

const links: (LinkForNotAuthed | LinkPojo)[] = await $fetch("/api/links");
</script>

<template>
  <div class="list">
    <LinkPreview v-for="link in links" :key="link.slug" :link="link"></LinkPreview>
  </div>
</template>

<style scoped lang="scss">
.list {
  display: grid;
  gap: 15px;
}
</style>
