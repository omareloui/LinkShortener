<script setup lang="ts">
import type { AuthState } from "../../composables/useAuthState";
import type { Modal } from "../../composables/useOpenModalState";
import CreateLinkBody from "./CreateLinkBody.vue";
import SignBody from "./SignBody.vue";

const [authState] = useAuthState();
const [openModal, setOpenModal] = useOpenModalState();

const isOpen = computed(() => !!openModal.value);

const BODIES: {
  [K in Modal]: {
    component: typeof CreateLinkBody | typeof SignBody;
    title: string;
    shortCut: string;
    authStateToOpen: AuthState;
  };
} = {
  sign: { component: SignBody, title: "Sign in", shortCut: "KeyS", authStateToOpen: "not-authed" },
  "create-link": {
    component: CreateLinkBody,
    title: "Create a new link",
    shortCut: "KeyC",
    authStateToOpen: "is-authed",
  },
} as const;

const modalContent = computed(() => (openModal.value ? BODIES[openModal.value] : null));

function open(modal: Modal) {
  if (authState.value !== BODIES[modal].authStateToOpen) return;
  return setOpenModal(modal);
}

function close() {
  return setOpenModal(null);
}

function onClick(e: Event) {
  const target = e.target as HTMLElement;
  if (target.classList.contains("modal")) close();
}

function onKeyup(e: KeyboardEvent) {
  const { code } = e;
  if (code === "Escape") close();

  const foundKey = Object.keys(BODIES).find(key => code === BODIES[key].shortCut);
  if (foundKey) return open(foundKey);
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

defineExpose({ close });
</script>

<template>
  <Transition name="fade">
    <div class="modal" v-if="isOpen">
      <div class="content">
        <button type="button" class="close-modal" @click="close"><IconX /></button>
        <Transition name="fade">
          <h3 class="title" v-if="modalContent?.title">
            <span>{{ modalContent.title }}</span>
          </h3>
        </Transition>
        <Transition name="fade">
          <component v-if="modalContent?.component" :is="modalContent.component" />
        </Transition>
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
