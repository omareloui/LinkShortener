<script setup lang="ts">
import { LinkForNotAuthed, LinkPojo } from "../types";

const { link } = defineProps<{ link: LinkForNotAuthed | LinkPojo }>();

function isFullLink(link: LinkForNotAuthed | LinkPojo): link is LinkPojo {
  return !!(link as { _id?: string })._id;
}

const isFull = isFullLink(link);
const fullLink = link as LinkPojo;
</script>

<template>
  <div class="link" :class="{ 'link-preview--full': isFull }">
    <div class="link__left">
      <div class="link__counter" v-if="isFull">{{ fullLink.clicks }}</div>
      <div class="link__text-details">
        <span class="link__slug">/{{ link.slug }}</span>
        <span class="link__url">{{ link.url }}</span>
      </div>
    </div>
    <div class="link__right">
      <button class="link__copy" type="button"><IconCopy /></button>
      <button class="link__delete" type="button" v-if="isFull"><IconDelete /></button>
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

  &__slug {
    font-weight: bold;
    font-size: 1.2rem;
    margin-right: 10px;
  }
  &__url {
    font-size: 1rem;
    color: var(--subtext0);
  }

  &__right {
    justify-self: end;
    display: flex;

    button {
      background: none;
      outline: none;
      border: none;
      display: grid;
      place-items: center;
      cursor: pointer;
      @include size(23px);

      ::v-deep(svg) {
        @include size(100%);
      }
    }
  }
}
</style>
