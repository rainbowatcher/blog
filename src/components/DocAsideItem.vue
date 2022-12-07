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
        <DocAsideItem :headers="children" />
      </template>
    </li>
  </ul>
</template>

<style scoped>
/* .nested {
  padding-left: 13px;
} */

/* .outline-link {
  display: block;
  line-height: 28px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.5s;
} */

/* .outline-link:hover,
.outline-link.active {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
} */

.outline-link.nested {
  padding-left: 13px;
}
</style>
