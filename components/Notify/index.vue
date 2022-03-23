<script setup lang="ts">
import { useNotificationStore } from "~~/store/useNotification";

const notificationStore = useNotificationStore();
</script>

<template>
  <div>
    <div class="notifications">
      <div
        v-for="notification in notificationStore.notifications"
        :class="`notification notification--${notification.type} ${
          notification.isShown ? 'notification--shown' : ''
        }`"
        :key="notification.id"
      >
        <transition name="fade">
          <div v-if="notification.isShown" class="notification__content">
            {{ notification.message }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *

$offset: 10px

.notifications
  z-index: 999
  +grid($gap: 5px)
  +pos-f(bottom $offset right $offset)
  +w(100%)
  +not-clickable

  .notification
    +grid($center-v: true)
    justify-self: right
    width: calc(100% - #{$offset * 2})
    +center-text
    +fs-lg

    +lt-tablet
      +w(auto)
      max-width: calc(var(--screen-tablet) - #{$offset * 2})
      text-align: left

    +e(content)
      +br-lg
      +pa(10px 20px)
      +clr-txt(light)


    // Set notifications colors
    @each $type in success error warn info
      &--#{$type} .notification__content
        +clr-bg($type)
</style>
