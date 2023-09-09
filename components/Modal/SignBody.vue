<script setup lang="ts">
import { parseErrorMessage } from "~~/server/utils/error";
import InputText from "../Input/Text.vue";

const [, setAuthState] = useAuthState();
const keyInput = ref<InstanceType<typeof InputText> | null>(null);
const signKey = ref("");
const disableSubmit = ref(false);
const errorMessage = ref<string | null>(null);

async function submit() {
  if (disableSubmit.value) return;
  try {
    errorMessage.value = null;
    disableSubmit.value = true;
    const { error } = await useFetch("/api/auth/sign", {
      method: "POST",
      body: JSON.stringify({ key: signKey.value }),
    });

    if (error.value?.statusCode === 422) throw new Error("Invalid key");
    else if (error.value) throw new Error("Something went wrong. Please try again later.");

    setAuthState("is-authed");
    location.pathname = "/";
  } catch (e) {
    errorMessage.value = parseErrorMessage(e);
  } finally {
    disableSubmit.value = false;
  }
}

async function focusOnKeyInput() {
  await nextTick();
  keyInput.value?.focus();
}

onMounted(focusOnKeyInput);
</script>

<template>
  <form @submit.prevent="submit">
    <InputPassword ref="keyInput" placeholder="Entry the key" v-model="signKey" label="Key" name="key" required />
    <Transition v-if="errorMessage" name="fade"
      ><ErrorMessage class="error-message">{{ errorMessage }}</ErrorMessage></Transition
    >
    <ButtonBase type="submit" is-block is-gradiant :disabled="disableSubmit">Sign</ButtonBase>
  </form>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

form {
  display: grid;
  gap: 20px;
  width: 100%;
}
</style>
