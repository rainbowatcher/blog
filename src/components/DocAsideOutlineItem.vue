<script setup lang="ts">
import type { MenuItem } from "~/types"

defineProps<{
  headers: MenuItem[]
}>()
</script>

<template>
  <ul class="pl-3">
    <li v-for="{ children, link, title } in headers" :key="title">
      <a class="outline-link block lh-6 font-400 color-zinc-800/80 dark:color-zinc-100/60 whitespace-nowrap overflow-hidden text-ellipsis hover:color-cyan-200" :href="link">{{ title }}</a>
      <template v-if="children?.length">
        <DocAsideOutlineItem :headers="children" />
      </template>
    </li>
  </ul>
</template>

<style scoped>
.outline-link.nested {
  padding-left: 13px;
}
</style>
