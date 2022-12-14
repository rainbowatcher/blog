<script lang="ts" setup>
import type { MenuItem } from "~/types"

const headers = ref<MenuItem[]>([])
const container = ref()
const marker = ref()
const { asideClass, canceler } = useAsidePos()
// const isFixed = ref(false)
// const containerTop = ref(0)
// const siteHeaderHeight = 74 + 32

// function checkOutlinePosition() {
//   if (window.scrollY >= (containerTop.value - siteHeaderHeight)) {
//     isFixed.value = true
//   } else {
//     isFixed.value = false
//   }
// }

onMounted(() => {
  headers.value = getHeaders(3)
})

useActiveAnchor(container, marker)

onUnmounted(() => {
  canceler()
})
</script>

<template>
  <div ref="container" class="aside-outline-container hidden md:block text-sm" w-13rem :class="asideClass">
    <div pl-3 font-500>
      In the article
    </div>
    <div class="content b-(l-1 zinc-400/30)">
      <div ref="marker" class="outline-marker absolute top-8 left-0 z3 opacity-0 w-1px h-6 bg-blue transition-top-250" />
      <nav>
        <DocAsideOutlineItem :headers="headers" />
      </nav>
    </div>
  </div>
</template>
