<script lang="ts" setup>
const asideClass = useAsidePos()
</script>

<template>
  <PageHeader />
  <PostHeader />
  <main class="content mx-auto flex justify-center px-4 md:px-6">
    <div class="left-aside">
      <div :class="asideClass">
        {{ "" }}
      </div>
    </div>
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
  margin-top: 2.5rem;
  top: var(--sika-h-page-header);
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
  margin: 0rem 1rem 1rem 0;
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
</style>
