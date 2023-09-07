<script setup lang="ts">
import { LinkForNotAuthed, LinkPojo } from "../types";

const { removeLink: _removeLink } = await useLinksStore();

const [authState] = useAuthState();
const _copy = useCopy();
const { link } = defineProps<{ link: LinkForNotAuthed | LinkPojo }>();
const slug = ref(useLinkGenerator(link, { slugOnly: true }) as string);

const isFull = computed(() => authState.value === "is-authed");
const fullLink = link as LinkPojo;

function copy() {
  return _copy(`${location.origin}/${slug.value}`);
}

function removeLink() {
  return _removeLink(link);
}
</script>

<template>
  <div class="link" :class="{ 'link-preview--full': isFull }">
    <div class="link__left">
      <div class="link__counter" v-if="isFull">{{ fullLink.clicks }}</div>
      <div class="link__text-details">
        <NuxtLink :to="slug" class="link__slug">/{{ link.slug }}</NuxtLink>
        <span class="link__url">{{ link.url }}</span>
      </div>
    </div>
    <div class="link__right">
      <ButtonLinkPreview help-tip="Copy" @click="copy"><IconCopy /></ButtonLinkPreview>
      <ButtonLinkPreview v-if="isFull" help-tip="Delete" @click="removeLink"><IconDelete /></ButtonLinkPreview>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.link {
  display: grid;
  grid-template-columns: 1fr 100px;
  border-radius: 6px;
  background: var(--blur-surface5);
  backdrop-filter: blur(3px);
  padding: 12px 30px;
  align-items: center;
  @include w(100%);

  &__left {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  &__counter {
    --size: 25px;
    background: var(--gradient-primary);
    @include size(var(--size));
    border-radius: 4px;
    font-size: 0.9rem;
    line-height: var(--size);
    text-align: center;
    font-weight: bold;
  }

  &__slug {
    font-weight: bold;
    font-size: 1.2rem;
    margin-right: 10px;
    text-decoration: none;
    &:focus {
      outline: 2px dotted var(--subtext0);
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  &__url {
    font-size: 1rem;
    color: var(--subtext0);
  }

  &__right {
    justify-self: end;
    display: flex;
    gap: 12px;
  }
}
</style>
