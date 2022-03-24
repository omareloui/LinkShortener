import { CreateLink } from '~~/@types';
<script setup lang="ts">
import type { CreateLink } from "~~/@types";
import { useLinksStore } from "~~/store/useLinks";

const linksStore = useLinksStore();

const notify = useNotify();
const slugHelper = useSlugHelper();

const url = ref("");
const slug = ref("");

const linkPreview = ref("");

const isLoading = ref(false);
const isFormOpen = ref(false);

const error = reactive({
  field: null,
  message: "",
  clear: () => {
    error.message = "";
    error.field = null;
  },
});

watch(slug, () => {
  linkPreview.value = `${location.host}/${slugHelper.create(slug.value)}`;
});

async function onSubmit() {
  const body = { url: url.value, slug: slug.value } as CreateLink;

  try {
    isLoading.value = true;
    await linksStore.create(body);
    emptyForm();
    notify.success("Created the link.");
  } catch (e) {
    setError(e.message);
    notify.error(e.message);
    return;
  } finally {
    isLoading.value = false;
  }
}

function setError(message: string) {
  if (message.match(/slug/i)) error.field = "slug";
  if (message.match(/url/i)) error.field = "url";

  if (!error.field) return;

  error.message = message;
}

function emptyForm() {
  url.value = "";
  slug.value = "";
}

function open() {
  isFormOpen.value = true;
}

function close() {
  isFormOpen.value = false;
}
</script>

<template>
  <div class="open-button" v-if="!isFormOpen">
    <ButtonCreateLink @open="open" />
  </div>

  <FormBase
    v-else
    :is-loading="isLoading"
    @submit="onSubmit"
    class="create-link-form"
  >
    <ButtonBase
      @click="close"
      type="button"
      class="create-link-form__close-button"
    >
      <IconClose />
    </ButtonBase>

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
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *

.open-button
  +my(20px)
  +grid($center: true)

.create-link-form
  +pos-r
  +my(20px)

  +e(close-button)
    +pos-a(right 20px top 20px)
    +clr-bg(cancel)
    +brdr($size: 0)
    +size(20px)
    +grid($center: true)
    +br-cr

    +lt-mobile
      +size(25px)

    ::v-deep(svg)
      +size(60%)

  +e(heading)
    +fw-semibold
    +clr-txt(secondary)
    +fs-2xl
    +center-text

  +e(preview-slug)
    +fs-sm
    +clr-txt(fade)
    +center-text
</style>
