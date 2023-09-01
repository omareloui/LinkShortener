<script setup lang="ts">
import InputText from "../Input/Text.vue";
import ModalBase from "./Base.vue";
import { parseErrorMessage } from "~~/server/utils/error";

const keyInput = ref<InstanceType<typeof InputText> | null>(null);

const signKey = ref("");

const modal = ref<InstanceType<typeof ModalBase> | null>();

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

    location.href = location.origin;
    modal.value?.close();
  } catch (e) {
    errorMessage.value = parseErrorMessage(e);
  } finally {
    disableSubmit.value = false;
  }
}

function open() {
  modal.value?.open();
  setTimeout(() => {
    keyInput.value?.focus();
  }, 0);
}

function onKeyup(e: KeyboardEvent) {
  if (e.code === "KeyS" && document.activeElement?.tagName !== "INPUT") open();
}

function init() {
  addEventListener("keyup", onKeyup);
}
function onDestroy() {
  removeEventListener("keyup", onKeyup);
}

defineExpose({ open });

onBeforeMount(init);
onBeforeUnmount(onDestroy);
</script>

<template>
  <ModalBase title="Sign in" ref="modal">
    <form @submit.prevent="submit">
      <InputPassword ref="keyInput" placeholder="Entry the key" v-model="signKey" label="Key" name="key" required />
      <Transition v-if="errorMessage" name="fade"
        ><ErrorMessage class="error-message">{{ errorMessage }}</ErrorMessage></Transition
      >
      <ButtonBase type="submit" is-block is-gradiant :disabled="disableSubmit">Submit</ButtonBase>
    </form>
  </ModalBase>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

form {
  display: grid;
  gap: 20px;
  width: 100%;
}
</style>
