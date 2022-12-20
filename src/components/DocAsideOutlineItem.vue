<script setup lang="ts">
import type { MenuItem } from "~/types"

const props = defineProps<{
  headers: MenuItem[]
}>()
</script>

<template>
  <ul class="pl-3">
    <li v-for="{ level, link, title } in headers" :key="title">
      <a
        class="outline-link block lh-6 font-500 color-zinc-800/80 dark:color-zinc-100/60 whitespace-nowrap overflow-hidden text-ellipsis"
        :href="link" :class="`level-${level}`"
      >{{ title }}</a>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.outline-link {
  --padding-offset: 1rem;
  &.level-3 {
    padding-left: calc(1 * var(--padding-offset));
  }
  &.level-4 {
    padding-left: calc(2 * var(--padding-offset));
  }
  &.active {
    color: var(--sika-c-brand)
  }
}
</style>
