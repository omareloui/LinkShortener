<script setup lang="ts">
import { useLinksStore } from "~~/store/useLinks";

const query = ref("");
const linksStore = useLinksStore();

await linksStore.fetchLinks();

watch(query, val => linksStore.search(val));
</script>

<template>
  <section class="links-preview">
    <InputBase
      class="links-preview__search"
      is-large
      type="search"
      v-model="query"
      placeholder="Type to search..."
    />

    <TransitionGroup
      name="links-preview"
      tag="div"
      class="links-preview__links"
    >
      <PreviewLink
        v-for="link in linksStore.preview"
        :key="link._id"
        :link="link"
      />
    </TransitionGroup>
  </section>
</template>

<style lang="sass">
@use "~~/assets/styles/mixins" as *

.links-preview__links
  +grid($gap: 15px)
</style>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *

.links-preview
  &__search
    +mb(20px)
    +mx(auto)
    +w(max 350px)
</style>
