<script setup lang="ts">
import type { Link, CreateLink } from "~~/@types";

import { useThemeStore } from "~~/store/useTheme";
const themeStore = useThemeStore();

const created = ref("");

async function createLink() {
  const form = document.querySelector("form");
  const formData = new FormData(form);
  const body = Object.fromEntries(formData.entries()) as unknown as CreateLink;
  const { data, error } = await useFetch("/api/create", {
    method: "POST",
    body,
  });

  if (error.value) throw new Error(error.value);

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

        <!-- <div>
          <label for="slug">Slug: </label>
          <input type="text" id="slug" name="slug" />
        </div> -->

        <input type="submit" value="create link" />
      </form>
    </Container>
    <div>Created: {{ created }}</div>
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
