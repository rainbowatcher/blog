<script lang="ts" setup>
import { toPx } from "~/utils/unit"

const headerHeight = useCssVar("--sika-h-page-nav")
const [isVisible, toggleVisible] = useToggle(false)
const [isFixed, toggleFixed] = useToggle(false)
const headerHeightPx = computed(() => toPx(headerHeight.value))
const { y, arrivedState, directions } = useScroll(globalThis.window, { onScroll })

function onScroll() {
    if (directions.top && y.value > headerHeightPx.value) {
        toggleVisible(true)
    }
    else if (directions.bottom && y.value > headerHeightPx.value) {
        toggleVisible(false)
        toggleFixed(true)
    }
    else if (arrivedState.top) {
        toggleVisible(false)
        toggleFixed(false)
    }
}
</script>

<template>
    <header
        class="page-nav" :class="{
            'header-fixed': isFixed,
            'header-visible': isVisible,
        }"
    >
        <HeaderTitle />
        <div class="header-content flex flex-(row gap-4)">
            <Nav :in-content="true" />
            <Extra :in-content="true" />
            <Flyout />
            <Hamburger />
        </div>
    </header>
</template>

<style lang="scss" scoped>
.page-nav {
  position: absolute;
  inset: 0;
  background-color: transparent;
  width: 100%;
  height: var(--sika-h-page-nav);
  padding: 1.25rem;
  z-index: 10;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  color: white;
  transition: background-color .1s ease-in, color .1s ease;
}

.header-visible {
  transform: translateY(100%);
}

html:not(.dark) .header-fixed {
  color: rgb(82, 82, 82);
}

.header-fixed {
  position: fixed;
  top: calc(0px - var(--sika-h-page-nav));
  background-color: var(--sika-c-page-nav-bg);
  border-bottom: 1px solid var(--sika-c-page-nav-border);
  box-shadow: 0 1px 8px 0 var(--sika-c-page-nav-shadow);
  transition: transform .3s ease;
}
</style>
