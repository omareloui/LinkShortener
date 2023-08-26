<script setup lang="ts">
import { LinkForNotAuthed, LinkPojo } from "types";

const { data: links } = await useFetch("/api/links");

const data = reactive({ links: links.value as (LinkForNotAuthed | LinkPojo)[] });
const query = ref("");

watch(query, onQueryChange);

function onQueryChange(newValue: string) {
  if (!newValue) data.links = links.value as (LinkForNotAuthed | LinkPojo)[];
  data.links = links.value!.filter(x => x.url.match(newValue) || x.slug.match(newValue)).map(x => ({ ...x }));
}
</script>

<template>
  <Container tag="main">
    <SearchBar v-model="query"></SearchBar>
    <LinksList :links="data.links"></LinksList>
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

main {
  display: grid;
  gap: 30px;
}
</style>
