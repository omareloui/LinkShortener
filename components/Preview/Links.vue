<script setup lang="ts">
import { useLinksStore } from "~~/store/useLinks";

const linksStore = useLinksStore();

await linksStore.fetchLinks();
</script>

<template>
  <section class="links-preview">
    <TransitionGroup name="links-preview" tag="div">
      <PreviewLink
        v-for="link in linksStore.links"
        :key="link._id"
        :link="link"
      />
    </TransitionGroup>
  </section>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *


.links-preview > :first-child
  +grid($gap: 15px)
</style>
