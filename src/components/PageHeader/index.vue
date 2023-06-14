<script lang="ts" setup>
import { toPx } from "~/utils/unit"

const headerHeight = useCssVar("--sika-h-page-header")
const [isVisible, toggleVisible] = useToggle(false)
const [isHide, toggleHide] = useToggle(false)
const [isAbs, toggleAbs] = useToggle(true)
const headerHeightPx = computed(() => toPx(headerHeight.value))
const { y, arrivedState, directions } = useScroll(globalThis.window, { onScroll })

function onScroll() {
  if (directions.top && y.value > headerHeightPx.value) {
    toggleVisible(true)
    toggleHide(false)
  } else if (directions.bottom && y.value > headerHeightPx.value) {
    toggleVisible(false)
    toggleHide(true)
    toggleAbs(false)
  } else if (arrivedState.top) {
    toggleAbs(true)
    toggleVisible(false)
    toggleHide(false)
  }
}
</script>

<template>
  <header
    class="page-header" :class="{
      'header-abs': isAbs,
      'header-hide': isHide,
      'header-visible': isVisible,
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
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content: space-between

  width: 100%
  height: var(--sika-h-page-header)
  padding: 1.25rem
  z-index: 99
  transition-property: all
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)
  transition-duration: 250ms

  color: #ffffff
  background-color: rgba(63, 63, 70, 0.4)
  border-bottom: 1px solid rgba(24, 24, 27, 0.1)
  @apply shadow-md backdrop-blur-md shadow-dark/40

.header-abs
  @apply absolute text-white bg-transparent b-b-none backdrop-blur-none shadow-none

.header-visible
  @apply fixed top-0

.header-hide
  @apply fixed top-[calc(0px-var(--sika-h-page-header))]
</style>
