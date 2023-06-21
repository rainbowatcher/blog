<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: false,
  },
})
// TODO: Maybe we should use useTitle() fn to specify title.
const asideClass = useAsidePos()
const outline = ref(undefined)
</script>

<template>
  <PageNav />
  <PostHeader :title="title" />
  <main class="content mx-auto flex justify-center lt-md-(p-5)">
    <aside class="left-aside">
      <div :class="asideClass">
        {{ "" }}
      </div>
    </aside>
    <slot />
    <div class="right-aside">
      <DocAsideOutline ref="outline" />
    </div>
  </main>
  <div class="page-curtain lt-md-hidden" />
  <Footer />
</template>

<style lang="scss">
// side anchor
.is-fixed {
  position: fixed;
  top: calc(var(--sika-h-page-nav) + 2rem);
}

.is-abs {
  // position: absolute;
  // top: var(--sika-h-post-header);
  margin-top: 0rem;
}

.left-aside {
  display: none;
  margin: 0rem 1rem 1rem 0;
  overflow-y: auto;
  flex-basis: 14rem;
  width: 14rem;
  flex-shrink: 0;
}

@media (min-width: 1280px) {
  .left-aside {
    display: block;
  }
}

.right-aside {
  display: none;
  position: relative;
  margin: 2rem 1rem 1rem 1rem;
  overflow-y: auto;
  flex-basis: 14rem;
  width: 14rem;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .right-aside {
    display: block;
  }
}

.page-curtain {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
  height: 32px;
  pointer-events: none;
  background: linear-gradient(transparent,var(--sika-c-page-bg) 98%);
}
</style>
