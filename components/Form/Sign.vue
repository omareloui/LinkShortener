<script setup lang="ts">
import { useLayoutStore } from "~~/store/useLayout";
import { useAuthStore } from "~~/store/useAuth";

const layoutStore = useLayoutStore();
const authStore = useAuthStore();

const notify = useNotify();
const getErrorMessage = useGetErrorMessage();

const key = ref("");

const isLoading = ref(false);

const error = reactive({
  field: null as null | string,
  message: "",
  clear: () => {
    error.message = "";
    error.field = null;
  },
});

function emptyForm() {
  key.value = "";
}

function setError(message: string) {
  error.field = "key";
  error.message = message;
}

async function onSubmit() {
  try {
    isLoading.value = true;
    await authStore.sign(key.value);
    emptyForm();
    notify.success("Signed in successfully");
    layoutStore.isSignFormOpen = false;
  } catch (e) {
    const message = getErrorMessage(e);
    setError(message);
    notify.error(message);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <FormBase
    v-if="layoutStore.isSignFormOpen"
    :is-loading="isLoading"
    @submit="onSubmit"
    class="create-link-form"
  >
    <ButtonBase
      @click="layoutStore.closeSignForm"
      type="button"
      class="create-link-form__close-button"
    >
      <IconClose />
    </ButtonBase>

    <h2 class="create-link-form__heading">Sign</h2>
    <InputText
      :error="error"
      type="password"
      name="key"
      label="Key"
      placeholder="Enter the key"
      v-model="key"
      autofocus
    />

    <template #submit>Sign</template>
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
