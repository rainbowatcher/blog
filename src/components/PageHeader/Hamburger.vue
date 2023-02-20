<script lang="ts" setup>
const { t } = useI18n()
const { nav } = useConfig()
const show = ref(false)
const lock = useScrollLock(computedBody, false)
const toggleShow = useToggle(show)
const toggleLock = useToggle(lock)
const togglePanel = () => {
  toggleLock()
  toggleShow()
}
</script>

<template>
  <div md:hidden>
    <button class="i-carbon-menu" z2 pointer-events-auto title="menu" @click="togglePanel()" />
    <div
      v-show="show"
      class="hamburger fixed top-74px left-0 right-0 overflow-auto h-screen w-full bg-zinc-200 color-zinc-900 dark:color-inherit dark:bg-zinc-800 p-4"
    >
      <Nav />
      <Extra />
    </div>
  </div>
</template>
