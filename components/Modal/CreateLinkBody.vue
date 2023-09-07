<script setup lang="ts">
import InputBase from "../Input/Base.vue";

import { parseErrorMessage } from "~~/server/utils/error";

const [, setModalState] = useOpenModalState("create-link");

const slugHelper = useSlugHelper();
const { createLink } = await useLinksStore();

const disableSubmit = ref(false);
const errorMessage = ref<string | null>(null);
const urlInput = ref<InstanceType<typeof InputBase> | null>(null);

const url = ref("");
const slug = ref("");

const slugPreview = computed(() =>
  process.client && slug.value ? `${origin}/${slugHelper.create(slug.value)}` : null,
);

function clearInputs() {
  url.value = "";
  slug.value = "";
}

async function submit() {
  if (disableSubmit.value) return;
  try {
    errorMessage.value = null;
    disableSubmit.value = true;
    await createLink({ url: url.value, slug: slug.value });
    setTimeout(clearInputs, 500);
    setModalState(null);
  } catch (e) {
    errorMessage.value = parseErrorMessage(e);
  } finally {
    disableSubmit.value = false;
  }
}

async function focusOnUrlInput() {
  await nextTick();
  urlInput.value?.focus();
}

onMounted(focusOnUrlInput);
</script>

<template>
  <form @submit.prevent="submit">
    <InputBase
      ref="urlInput"
      type="url"
      placeholder="Enter a url to shorten"
      v-model="url"
      label="Url"
      name="url"
      required
      no-auto-complete
    />
    <InputText placeholder="Enter a custom slug" v-model="slug" label="Slug" name="slug" no-auto-complete />
    <Transition v-if="slugPreview" name="fade">
      <div class="link-preview">{{ slugPreview }}</div>
    </Transition>
    <Transition v-if="errorMessage" name="fade"
      ><ErrorMessage class="error-message">{{ errorMessage }}</ErrorMessage></Transition
    >
    <ButtonBase type="submit" is-block is-gradiant :disabled="disableSubmit">Create Link</ButtonBase>
  </form>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

form {
  display: grid;
  gap: 20px;
  width: 100%;

  ::v-deep(button) {
    margin-top: 20px;
  }

  .link-preview {
    text-align: center;
    font-size: 0.8rem;
    // TODO: add this to a variable and get the light version
    color: #5e5e5e;
  }
}
</style>
