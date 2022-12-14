<script lang="ts" setup>
defineProps({
  type: {
    type: String,
    required: false,
    default: "tip",
  },
  text: {
    type: String,
    required: false,
    default: "",
  },
  vertical: {
    type: String,
    required: false,
    default: undefined,
  },
})
</script>

<template>
  <span
    class="badge"
    :class="type"
    :style="{
      verticalAlign: vertical,
    }"
  >
    <slot>{{ text }}</slot>
  </span>
</template>

<style lang="sass">
.badge
  display: inline-block
  font-size: 14px
  height: 18px
  line-height: 18px
  border-radius: 3px
  padding: 0 6px
  vertical-align: top

  &.tip
    @apply bg-green color-neutral-800

  &.warning
    @apply bg-yellow color-neutral-800

  &.danger
    @apply bg-red color-neutral-800

  .table-of-contents &
    vertical-align: middle

  & + &
    margin-left: 5px
</style>
