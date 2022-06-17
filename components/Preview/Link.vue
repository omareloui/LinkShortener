<script setup lang="ts">
import type { Link } from "~~/@types";
import { useLinksStore } from "~~/store/useLinks";
import { useAuthStore } from "~~/store/useAuth";

defineProps<{ link: Link }>();

const linksStore = useLinksStore();
const authStore = useAuthStore();

const notify = useNotify();
const copy = useCopy();
const clicksCounter = useClicksCounter();

async function removeLink(link: Link) {
  const isConfirmed = await window.confirm(
    `Are you sure you want to remove /${link.slug}`
  );
  if (!isConfirmed) return;

  try {
    await linksStore.remove(link);
    notify.success("Removed link.");
  } catch (e) {
    notify.error(useGetErrorMessage()(e));
  }
}

function copyLink(slug: string) {
  copy(`${window.location.origin}${useUrl(slug)}`);
}
</script>

<template>
  <div class="link">
    <div
      class="link__clicks"
      :title="clicksCounter(link)"
      v-if="authStore.isSigned"
    >
      <span>{{ link.visits?.length || 0 }}</span>
    </div>

    <div class="link__text">
      <div class="link__slug">
        <NuxtLink :to="useUrl(link)">/{{ link.slug }}</NuxtLink>
      </div>
      <div class="link__url">{{ link.url }}</div>
    </div>

    <div class="link__actions">
      <ButtonBase
        class="button button--copy"
        is-normalized
        @click="copyLink(link.slug)"
        aria-label="Copy link"
      >
        <IconCopy class="button__icon" color="var(--clr-text-invert)" />
      </ButtonBase>
      <ButtonBase
        v-if="authStore.isSigned"
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
  --clicks-size: 20px

  +grid($gap: 10px, $columns:  auto 1fr auto)

  +pa(12px 15px)
  +w(100%)

  +br-lg

  +clr-txt(invert)
  +clr-bg(light)

  +e(clicks)
    +pos-r
    +br-md
    +fs-xs
    +fw-medium
    +px(5px)
    +w(min var(--clicks-size))
    +h(var(--clicks-size))
    align-self: center

    +clr-txt
    background: var(--primary-gradient)

    span
      +block
      +center-text

  +e(text)
    +flex($gap: 10px)
    align-items: center
    +no-wrap
    overflow: hidden

  +e(url)
    +fw-medium
    +fs-sm
    +underline
    +clr-txt(invert, 0.6)

    overflow: hidden
    text-overflow: ellipsis
    width: 100%

  +e(slug)
    +fw-semibold
    a
      +no-underline
      +clr-txt(invert)

  +e(actions)
    +flex($gap: 10px, $center: true)
    justify-content: end

    .button
      +size(18px)

      +e(icon)
        +size(100%)
</style>
