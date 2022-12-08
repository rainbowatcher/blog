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
  const unwatchReachTop = watch(() => [isScrolling.value, directions.bottom], () => {
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
    ref="header" flex="~ flex-1 row nowrap"
    class="justify-between fixed w-full p-xl z-99 transition-all duration-250 b-b-transparent" :class="{
      'header-abs': headerAbs,
      'header-hide': headerHide,
      'header-visible': headerFixedVisible,
    }"
  >
    <RouterLink to="/">
      <h1>
        Polymorph
      </h1>
    </RouterLink>
    <Nav />
  </header>
</template>

<style lang="sass" scoped>
.header-abs
  @apply absolute color-white;

.header-visible
  @apply fixed top-0 bg-zinc-700/40 shadow-md backdrop-blur-md shadow-dark/40 text-white b-b-zinc900/10 b-b-1;

.header-hide
  @apply fixed -top-4.5rem b-b-zinc900/10 b-b-1;

h1
  @apply text-2xl;
</style>
