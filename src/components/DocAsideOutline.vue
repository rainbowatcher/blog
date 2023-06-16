<script lang="ts" setup>
import type { MenuItem } from "~/types"

const headers = ref<MenuItem[]>([])
const container = ref()
const marker = ref()
const asideClass = useAsidePos()

onMounted(() => {
  headers.value = getHeaders(2)
  if (headers.value.length) {
    useActiveAnchor(container, marker)
  }
})
</script>

<template>
  <div v-if="headers.length" ref="container" class="aside-outline-container hidden md:block text-sm" w-13rem :class="asideClass">
    <div pl-3 font-500>
      In the article
    </div>
    <div class="content b-(l-1 zinc-400/30)">
      <div ref="marker" class="outline-marker absolute top-8 left-0 z3 opacity-0 w-1px h-6 bg-blue transition-top-250" />
      <DocAsideOutlineItem :headers="headers" />
    </div>
  </div>
</template>
