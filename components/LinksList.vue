<script setup lang="ts">
import { LinkForNotAuthed, LinkPojo } from "types";
defineProps<{ links: (LinkForNotAuthed | LinkPojo)[] }>();
defineEmits<{ (e: "refresh-list"): void }>();
</script>

<template>
  <TransitionGroup name="links-preview" tag="div" class="list">
    <LinkPreview
      v-for="link in links"
      :key="link.slug"
      :link="link"
      @refresh-list="$emit('refresh-list')"
    ></LinkPreview>
  </TransitionGroup>
</template>

<style lang="scss">
.list {
  display: grid;
  gap: 15px;
}
</style>
