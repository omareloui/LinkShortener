<script setup lang="ts">
import { LinkForNotAuthed, LinkPojo } from "types";
import SignModal from "../components/Modal/Sign.vue";
import CreateLinkModal from "../components/Modal/CreateLink.vue";

const { $isAuthed } = useNuxtApp();

const { data: links, refresh } = await useFetch("/api/links");

const data = reactive({ links: links.value as (LinkForNotAuthed | LinkPojo)[] });
const query = ref("");
const signModal = ref<InstanceType<typeof SignModal> | null>(null);
const createLinkModal = ref<InstanceType<typeof CreateLinkModal> | null>(null);

watch(query, onQueryChange);

function onQueryChange(newValue: string) {
  if (!newValue) data.links = links.value as (LinkForNotAuthed | LinkPojo)[];
  data.links = links.value!.filter(x => x.url.match(newValue) || x.slug.match(newValue)).map(x => ({ ...x }));
}

async function refreshList() {
  await refresh();
  data.links = links.value as (LinkForNotAuthed | LinkPojo)[];
}
</script>

<template>
  <Container tag="main">
    <Header @open-sign-modal="signModal?.open" />
    <SearchBar v-model="query" />
    <LinksList :links="data.links" @refresh-list="refreshList" />
    <FloatingButton v-if="$isAuthed" @open-create-link="createLinkModal?.open" />
  </Container>
  <ModalSign ref="signModal" v-if="!$isAuthed" />
  <ModalCreateLink ref="createLinkModal" v-if="$isAuthed" />
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

main {
  margin-top: 30px;

  display: grid;
  gap: 30px;
}
</style>
