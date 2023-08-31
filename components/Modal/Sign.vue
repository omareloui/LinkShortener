<script setup lang="ts">
import InputText from "../Input/Text.vue";
import ModalBase from "./Base.vue";

const keyInput = ref<InstanceType<typeof InputText> | null>(null);

const signKey = ref("");

const modal = ref<InstanceType<typeof ModalBase> | null>();

async function submit() {
  await useFetch("/api/auth/sign", {
    method: "POST",
    body: JSON.stringify({ key: signKey.value }),
  });
  modal.value?.close();
  location.href = location.origin;
}

function open() {
  modal.value?.open();
  setTimeout(() => {
    keyInput.value?.focus();
  }, 0);
}

function onKeyup(e: KeyboardEvent) {
  if (e.code === "KeyS" && document.activeElement.tagName !== "INPUT") open();
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
  <ModalBase title="Sign" ref="modal">
    <form @submit.prevent="submit">
      <InputText ref="keyInput" placeholder="Entry the key" v-model="signKey" label="Key" name="key" />
      <ButtonBase type="submit" is-block is-gradiant>Submit</ButtonBase>
    </form>
  </ModalBase>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

form {
  > :first-child {
    margin-bottom: 30px;
  }
}
</style>
