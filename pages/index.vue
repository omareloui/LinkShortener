<script setup lang="ts">
import type { Link, CreateLink } from "~~/@types";

import { useThemeStore } from "~~/store/useTheme";
const themeStore = useThemeStore();

const slugHelper = useSlugHelper();

const error = reactive({
  field: null,
  message: "",
  clear: () => {
    error.message = "";
    error.field = null;
  },
});

const created = ref(null as null | string);
const linkPreview = ref("");

const url = ref("");
const slug = ref("");

watch(slug, () => {
  linkPreview.value = `${location.host}/${slugHelper.create(slug.value)}`;
});

async function onSubmit() {
  const notify = useNotify();
  const body = { url: url.value, slug: slug.value } as CreateLink;

  body.slug &&= slugHelper.create(body.slug);

  const { data, error } = await useFetch("/api/create", {
    method: "POST",
    body,
  });

  if (error.value) {
    const { message } = error.value.data;
    setError(message);
    notify.error(message);
    created.value = null;
    return;
  }

  const newLink = data.value as Link;
  created.value = `${location.origin}/${newLink.slug}`;
  notify.success("Created the link.");
}

function setError(message: string) {
  if (message.match(/slug/i)) error.field = "slug";

  if (!error.field) return;

  error.message = message;
}
</script>

<template>
  <div class="homepage">
    <Container tag="main">
      <header>
        <div class="brand">
          <div class="logo-container">
            <Logo class="logo" color="var(--clr-primary)" />
          </div>

          <h1>omareloui links</h1>
        </div>

        <ButtonBase
          class="theme-button"
          @click="themeStore.toggleTheme"
          is-normalized
        >
          Toggle Theme
        </ButtonBase>
      </header>

      <main>
        <FormBase @submit="onSubmit" class="create-link-form">
          <h2 class="create-link-form__heading">Create a new link</h2>
          <InputText
            :error="error"
            type="url"
            name="url"
            label="URL"
            placeholder="Enter a url to shorten"
            v-model="url"
            autofocus
          />

          <InputText
            :error="error"
            name="slug"
            label="Slug"
            placeholder="Enter custom slug"
            v-model="slug"
            not-required
            role="presentation"
            autocomplete="off"
          />

          <Transition name="fade">
            <div class="create-link-form__preview-slug" v-if="slug">
              {{ linkPreview }}
            </div>
          </Transition>
          <template #submit> Create Link </template>
        </FormBase>

        <Transition name="fade">
          <div class="created" v-if="created">
            <h3>Last Created</h3>
            <p class="body">
              <NuxtLink :to="created">{{ created }}</NuxtLink>
            </p>
          </div>
        </Transition>
      </main>
    </Container>
  </div>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *

.homepage
  --primary-gradient: linear-gradient(90deg, var(--clr-primary) 0%, var(--clr-secondary) 100%)

  +py(20px)

  header
    +flex($center: true, $space-between: true)

    .brand
      +flex($gap: 5px)

      .logo-container
        +grid($center: true)

        .logo
          +w(55px)

      h1
        +fw-bold
        +fs-base
        +clr-txt(primary)
        +mt(5px)
        +no-wrap

    .theme-button
      +pa(5px 8px)
      +br-md
      +fw-medium

      +clr-txt(light)
      background: var(--primary-gradient)

      opacity: 0.8


  .create-link-form
    +my(20px)

    +e(heading)
      +fw-semibold
      +clr-txt(secondary)
      +fs-2xl
      +center-text

    +e(preview-slug)
      +fs-sm
      +clr-txt(fade)
      +center-text

  .created
    +center-text
    +fw-bold

    h3
      +clr-txt(fade)
      +fs-xs
      +mb(3px)
</style>
