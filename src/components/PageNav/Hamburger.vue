<script lang="ts" setup>
const show = ref(false)
const lock = useScrollLock(computedBody, false)
const toggleShow = useToggle(show)
const toggleLock = useToggle(lock)
function togglePanel() {
  toggleLock()
  toggleShow()
}
</script>

<template>
  <div md:hidden>
    <button class="i-carbon-menu" pointer-events-auto z2 title="menu" @click="togglePanel()" />
    <div
      v-show="show"
      class="hamburger fixed left-0 right-0 top-[var(--sika-h-page-nav)] h-screen w-full overflow-auto bg-zinc-200 p-4 color-zinc-900 dark:bg-zinc-800 dark:color-inherit"
    >
      <Nav />
      <Extra />
    </div>
  </div>
</template>
