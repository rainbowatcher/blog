<script lang="ts" setup>
import type { MenuItem } from "~/types"

const headers = ref<MenuItem[]>([])
const container = ref()
const marker = ref()
const asideClass = useAsidePos()

onMounted(() => {
    headers.value = getHeaders(2)
})

useActiveAnchor(container, marker)
</script>

<template>
    <div v-if="headers.length" ref="container" class="aside-outline-container hidden overflow-hidden text-sm md:block hover:overflow-y-auto" w-13rem max-h="[calc(100vh-var(--sika-h-page-nav)-2rem)]" :class="asideClass">
        <div pl-3 font-500>
            In the article
        </div>
        <div class="content b-(l-1 zinc-400/30)">
            <div ref="marker" class="outline-marker absolute left-0 top-8 z3 h-6 w-1px bg-[--sika-c-brand] opacity-0 transition-top-250" />
            <DocAsideOutlineItem :headers="headers" />
        </div>
    </div>
</template>

<style lang="scss">
.aside-outline-container {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
