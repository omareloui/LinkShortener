<script setup lang="ts">
import type { Link, CreateLink } from "~~/@types";

import { useThemeStore } from "~~/store/useTheme";
const themeStore = useThemeStore();

const created = ref("");

async function createLink() {
  const form = document.querySelector("form");
  const formData = new FormData(form);
  const body = Object.fromEntries(formData.entries()) as unknown as CreateLink;

  body.slug &&= useCreateSlug(body.slug);

  const { data, error } = await useFetch("/api/create", {
    method: "POST",
    body,
  });

  if (error.value) {
    if (error.value.data.statusCode === 409) console.log("Slug already in use");
    return (created.value = null);
  }

  const newLink = data.value as Link;
  created.value = `${location.origin}/${newLink.slug}`;
}
</script>

<template>
  <div>
    <!-- <div class="toggle-theme">
      <button class="toggle-theme__button" @click="themeStore.toggleTheme">
        Toggle Theme
      </button>
    </div> -->

    <Container tag="main">
      <form @submit.prevent="createLink">
        <div>
          <label for="url">Link: </label>
          <input type="url" id="url" name="url" required />
        </div>

        <div>
          <label for="slug">Slug: </label>
          <input type="text" id="slug" name="slug" />
        </div>

        <input type="submit" value="create link" />
      </form>

      <div>
        Created:
        <NuxtLink v-if="created" :to="created">{{ created }}</NuxtLink>

        <span v-else>duplicated slug or not set yet</span>
      </div>
    </Container>
  </div>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *

.toggle-theme
  +e(button)
    +brdr(none)
    +ff(main)
    +clickable
    +br-lg
    +clr-bg(invert)
    +clr-txt(invert)
    +pa(20px)
</style>
