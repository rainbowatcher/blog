<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: false,
  },
})
// TODO: May use useTitle() fn to specify title.
const asideClass = useAsidePos()
// calc((100% - (var(--vp-layout-max-width) - 64px)) / 2 + var(--vp-sidebar-width) - 32px);
</script>

<template>
  <PageNav />
  <PostHeader :title="title" />
  <main class="content mx-auto flex justify-center lt-md:px-5">
    <aside class="left-aside">
      <div :class="asideClass">
        {{ "" }}
      </div>
    </aside>
    <slot />
    <div class="right-aside">
      <DocAsideOutline />
    </div>
  </main>
  <Footer />
</template>

<style lang="scss">
// side anchor
.is-fixed {
  position: fixed;
  top: calc(var(--sika-h-page-header) + 2rem);
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
  height: calc(100vh - var(--sika-h-page-header) - 2rem);
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
  overflow: hidden;
  overflow-y: scroll;
  height: calc(100vh - var(--sika-h-page-header) - 2rem);
}

@media (min-width: 1024px) {
  .right-aside {
    display: block;
  }
}
</style>
