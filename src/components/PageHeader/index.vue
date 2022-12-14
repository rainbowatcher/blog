<script lang="ts" setup>
const header = ref<HTMLElement | null>(null)
const unwatchList: Function[] = []
const headerAbs = ref(true)
const headerFixedVisible = ref(false)
const toggleFixedVisible = useToggle(headerFixedVisible)
const toggleAbs = useToggle(headerAbs)
const headerHide = computed(() => !headerFixedVisible.value && !headerAbs.value)

onMounted(() => {
  const { y, isScrolling, arrivedState, directions } = useScroll(window)
  const headerHeight = header.value!.scrollHeight
  const unwatchReachTop = watch([isScrolling, directions], () => {
    if (arrivedState.top) {
      toggleAbs(true)
      toggleFixedVisible(false)
    } else if (y.value > headerHeight && directions.top) {
      toggleAbs(false)
      toggleFixedVisible(true)
    } else if (directions.bottom) {
      toggleFixedVisible(false)
      if (y.value > headerHeight)
        toggleAbs(false)
    }
  })

  unwatchList.push(unwatchReachTop)
})

onUnmounted(() => {
  unwatchList.forEach(unwatch => unwatch())
})
</script>

<template>
  <header
    ref="header" class="page-header" :class="{
      'header-abs': headerAbs,
      'header-hide': headerHide,
      'header-visible': headerFixedVisible,
    }"
  >
    <HeaderTitle />
    <div class="header-content flex-(~ row) flex-gap-4">
      <Nav :in-content="true" />
      <Extra :in-content="true" />
      <Flyout />
      <Hamburger />
    </div>
  </header>
</template>

<style lang="sass" scoped>
.page-header
  @apply flex-(~ row nowrap)
  @apply justify-between w-full inset-x-0 h-header p-xl z-99 transition-all-250 b-b-transparent

.header-abs
  @apply absolute text-white

.header-visible
  @apply fixed top-0 bg-zinc-700/40 shadow-md backdrop-blur-md shadow-dark/40 text-white
  @apply b-b-zinc900/10 b-b-1

.header-hide
  @apply fixed top-ph-hide
</style>
