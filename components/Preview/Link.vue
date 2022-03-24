<script setup lang="ts">
import type { Link } from "~~/@types";
import { useLinksStore } from "~~/store/useLinks";

defineProps<{ link: Link }>();

const linksStore = useLinksStore();

const notify = useNotify();
const copy = useCopy();
const clicksCounter = useClicksCounter();

async function removeLink(link: Link) {
  const isConfirmed = await confirm(
    `Are you sure you want to remove /${link.slug}`
  );
  if (!isConfirmed) return;

  try {
    await linksStore.remove(link);
    notify.success("Removed link.");
  } catch (e) {
    notify.error(e.message);
  }
}

function copyLink(slug: string) {
  copy(`${location.origin}/${slug}?s=ls`);
}
</script>

<template>
  <div class="link">
    <div class="link__clicks" :title="clicksCounter(link)">
      <span>{{ link.clicks }}</span>
    </div>

    <div class="link__text">
      <div class="link__slug">/{{ link.slug }}</div>
      <div class="link__url">{{ link.url }}</div>
    </div>

    <div class="link__actions">
      <ButtonBase
        class="button button--copy"
        is-normalized
        @click="copyLink(link.slug)"
        aria-label="Copy link"
      >
        <IconCopy class="button__icon" color="var(--clr-text-light)" />
      </ButtonBase>
      <ButtonBase
        class="button button--delete"
        is-normalized
        @click="removeLink(link)"
        aria-label="Remove link"
      >
        <IconDelete class="button__icon" color="var(--clr-danger)" />
      </ButtonBase>
    </div>
  </div>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *


.link
  --primary-gradient: linear-gradient(90deg, var(--clr-secondary), var(--clr-primary))
  --clicks-size: 20px

  +grid($gap: 10px, $columns:  var(--clicks-size) 1fr auto)

  +pa(12px 15px)
  +w(100%)

  background: var(--primary-gradient)

  +br-lg
  +clr-txt(light)

  +e(clicks)
    +pos-r
    +br-cr
    +clr-bg(light)
    +clr-txt(primary)
    +fs-xs
    +fw-bold
    +size(var(--clicks-size))
    align-self: center

    span
      +center
      +h(90%)
      +inline-block

  +e(text)
    +flex($gap: 10px)
    align-items: center
    +no-wrap
    overflow: hidden

  +e(url)
    +fw-light
    +fs-sm
    +underline
    +clr-txt(light, 0.6)

    overflow: hidden
    text-overflow: ellipsis
    width: 100%

  +e(slug)
    +fw-semibold

  +e(actions)
    +grid($gap: 10px, $center: true, $columns: repeat(2, 1fr))

    .button
      +size(18px)

      +e(icon)
        +size(100%)
</style>
