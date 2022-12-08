<script lang="ts" setup>
import type { MenuItem } from "~/types"

const headers = ref<MenuItem[]>([])
const container = ref()
const marker = ref()
const isFixed = ref(false)
const containerTop = ref(0)
const siteHeaderHeight = 74 + 32

function checkOutlinePosition() {
  // console.log(window.screenY)
  console.log(containerTop.value)
  if (window.scrollY > (containerTop.value - siteHeaderHeight)) {
    isFixed.value = true
  } else {
    isFixed.value = false
  }
}

onMounted(() => {
  checkOutlinePosition()
  containerTop.value = (container.value as HTMLDivElement).getClientRects()[0].top + window.scrollY
  headers.value = getHeaders(3)
  window.addEventListener("scroll", checkOutlinePosition)
})

useActiveAnchor(container, marker)

onUnmounted(() => {
  window.removeEventListener("scroll", checkOutlinePosition)
})
</script>

<template>
  <div ref="container" class="aside-outline-container hidden md:block text-sm mt-8 b-(l-1 zinc-400/30)" w-13rem :class="{ 'is-fixed': isFixed, 'is-abs': !isFixed }">
    <div ref="marker" class="outline-marker absolute top-8 -left-1px z3 opacity-0 w-1px h-6 bg-blue transition-top-250" />
    <nav aria-labelledby="doc-outline-aria-label">
      <DocAsideItem :headers="headers" />
    </nav>
  </div>
</template>

<style lang="scss">
.is-fixed {
  position: fixed;
  top: 74px;
}

.is-abs {
  position: absolute;
}
</style>
