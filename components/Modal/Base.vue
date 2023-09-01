<script setup lang="ts">
defineProps<{ title: string }>();

const isOpen = ref(false);

function open() {
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}

function onClick(e: Event) {
  const target = e.target as HTMLElement;
  if (target.classList.contains("modal")) close();
}

function onKeyup(e: KeyboardEvent) {
  if (e.code === "Escape") close();
}

function init() {
  addEventListener("click", onClick);
  addEventListener("keyup", onKeyup);
}

function onDestroy() {
  removeEventListener("click", onClick);
  removeEventListener("keyup", onKeyup);
}

onMounted(init);
onBeforeUnmount(onDestroy);

defineExpose({ open, close });
</script>

<template>
  <Transition name="fade">
    <div class="modal" v-if="isOpen">
      <div class="content">
        <button type="button" class="close-modal" @click="close"><IconX /></button>
        <h3 class="title">
          <span>{{ title }}</span>
        </h3>
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.modal {
  position: fixed;
  inset: 0;
  background: var(--blur-surface4);
  backdrop-filter: blur(10px);
  display: grid;
  place-items: center;

  .content {
    position: relative;
    background: var(--surface1);
    @include w(min(525px, 80%));
    @include h(max 80vh);
    border-radius: 10px;
    padding: 30px 25px;

    .close-modal {
      --size: 30px;
      background: var(--important);
      border: none;
      border-radius: 50%;
      @include size(var(--size));
      position: absolute;
      top: calc(var(--size) / 2 * -1);
      right: calc(var(--size) / 2 * -1);
      cursor: pointer;
      padding: 7px;
    }

    .title {
      display: gird;
      place-items: center;
      text-align: center;
      font-size: 1.8rem;
      margin-bottom: 10px;
      span {
        @include primary-gradient-text;
      }
    }
  }
}
</style>
