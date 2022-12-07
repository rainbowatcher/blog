<script lang="ts" setup>
import type { MenuItem } from "~/types"

const headers = ref<MenuItem[]>([])
const container = ref()
const marker = ref()
const isFixed = ref(false)
const containerTop = ref(0)
const siteHeaderHeight = 74 + 32

function onScroll() {
  if (window.scrollY > (containerTop.value - siteHeaderHeight)) {
    isFixed.value = true
  } else {
    isFixed.value = false
  }
}

onMounted(() => {
  containerTop.value = (container.value as HTMLDivElement).getClientRects()[0].top
  headers.value = getHeaders(3)
  window.addEventListener("scroll", onScroll)
})

useActiveAnchor(container, marker)

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll)
})
</script>

<template>
  <div ref="container" class="aside-outline-container hidden md:block relative text-sm mt-8 b-(l-1 zinc-400/30)" w-13rem :class="{ 'is-fixed': isFixed }">
    <div ref="marker" class="outline-marker absolute top-8 -left-1px z3 opacity-0 w-1px h-6 bg-blue transition-top-250" />
    <nav aria-labelledby="doc-outline-aria-label">
      <!-- <ul>
        <li v-for="h in headers" :key="h.title">
          <a class="outline-link" :href="h.link">
            {{ h.title }}
          </a>
        </li>
      </ul> -->
      <DocAsideItem :headers="headers" />
    </nav>
  </div>
</template>

<style lang="scss">
.is-fixed{
  position: fixed;
  top: 74px;
}
</style>
