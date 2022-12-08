<script lang="ts" setup>
import type { MenuItem } from "~/types"

const headers = ref<MenuItem[]>([])
const container = ref()
const marker = ref()
const isFixed = ref(false)
const containerTop = ref(0)
const siteHeaderHeight = 74 + 32

function checkOutlinePosition() {
  if (window.scrollY >= (containerTop.value - siteHeaderHeight)) {
    isFixed.value = true
  } else {
    isFixed.value = false
  }
}

onMounted(() => {
  containerTop.value = (container.value as HTMLDivElement).getClientRects()[0].top + window.scrollY
  checkOutlinePosition()
  headers.value = getHeaders(3)
  window.addEventListener("scroll", checkOutlinePosition)
})

useActiveAnchor(container, marker)

onUnmounted(() => {
  window.removeEventListener("scroll", checkOutlinePosition)
})
</script>

<template>
  <div ref="container" class="aside-outline-container hidden md:block text-sm mt-8 " w-13rem :class="{ 'is-fixed': isFixed, 'is-abs': !isFixed }">
    <div pl-3 font-500>
      In the article
    </div>
    <div class="content b-(l-1 zinc-400/30)">
      <div ref="marker" class="outline-marker absolute top-8 -left-1px z3 opacity-0 w-1px h-6 bg-blue transition-top-250" />
      <nav>
        <DocAsideItem :headers="headers" />
      </nav>
    </div>
  </div>
</template>

<style lang="scss">
.is-fixed {
  position: fixed;
  top: 74px;
}

// .is-abs {
//   position: absolute;
// }
</style>
