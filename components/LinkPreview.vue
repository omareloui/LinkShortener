<script setup lang="ts">
import { LinkForNotAuthed, LinkPojo } from "../types";

const { removeLink: _removeLink } = useLinksStore();

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
  <div class="link" :class="{ 'link--full': isFull }">
    <div class="link__left">
      <div class="link__counter" v-if="isFull">{{ fullLink.clicks }}</div>
      <div class="text-details">
        <NuxtLink :to="slug" class="text-details__slug">/{{ link.slug }}</NuxtLink>
        <span class="text-details__url">{{ link.url }}</span>
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
  --grid-gap: 20px;
  --counter-size: 25px;
  --action-buttons-gap: 12px;
  --action-button-size: 23px;

  display: grid;
  grid-template-columns: 1fr var(--action-button-size);
  gap: var(--grid-gap);
  border-radius: 6px;
  background: var(--blur-surface5);
  backdrop-filter: blur(3px);
  padding: 12px 30px;
  align-items: center;
  @include w(100%);

  &--full {
    grid-template-columns: 1fr calc(var(--action-button-size) * 2 + var(--action-buttons-gap));
  }

  &__left {
    display: flex;
    gap: var(--grid-gap);
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
  }

  &__counter {
    --inline-padding: 5px;

    background: var(--gradient-primary);
    @include h(var(--counter-size));
    @include w(min var(--counter-size));
    border-radius: 4px;
    font-size: 0.9rem;
    line-height: var(--counter-size);
    text-align: center;
    font-weight: bold;
    padding-inline: var(--inline-padding);
  }

  .text-details {
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
    align-items: flex-end;
    max-width: 100%;

    &__slug {
      display: block;
      font-weight: bold;
      font-size: 1.2rem;
      text-decoration: none;
      white-space: nowrap;

      &:focus {
        outline: 2px dotted var(--subtext0);
        outline-offset: -1px;
        border-radius: 6px;
      }
    }

    &__url {
      display: block;
      font-size: 1rem;
      color: var(--subtext0);
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
  }

  &__right {
    justify-self: end;
    display: flex;
    gap: var(--action-buttons-gap);
  }

  @include tablet-down {
    --counter-size: 20px;
    --grid-gap: 15px;
    --action-buttons-gap: 10px;
    --action-button-size: 18px;

    padding-inline: 20px;

    .link__counter {
      font-size: 0.8rem;
    }

    .text-details {
      &__slug {
        font-size: 1rem;
      }
      &__url {
        font-size: 0.8rem;
      }
    }
  }
}
</style>
