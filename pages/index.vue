<script setup lang="ts">
import { LinkForNotAuthed, LinkPojo } from "types";
import SignModal from "../components/Modal/Base.vue";

const { data: links } = await useFetch("/api/links");

const data = reactive({ links: links.value as (LinkForNotAuthed | LinkPojo)[] });
const query = ref("");
const modal = ref<InstanceType<typeof SignModal> | null>(null);

watch(query, onQueryChange);

function onQueryChange(newValue: string) {
  if (!newValue) data.links = links.value as (LinkForNotAuthed | LinkPojo)[];
  data.links = links.value!.filter(x => x.url.match(newValue) || x.slug.match(newValue)).map(x => ({ ...x }));
}
</script>

<template>
  <Container tag="main">
    <Header @open-sign-modal="modal?.open" />
    <SearchBar v-model="query" />
    <LinksList :links="data.links" />
  </Container>
  <ModalSign ref="modal" />
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

main {
  display: grid;
  gap: 30px;
  margin-top: 30px;
}
</style>
