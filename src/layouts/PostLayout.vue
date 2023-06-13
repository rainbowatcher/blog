<script lang="ts" setup>
const { asideClass, canceler } = useAsidePos()
</script>

<template>
  <PageHeader />
  <PostHeader />
  <main class="content flex justify-center mx-auto px-4 md:px-6">
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

<style lang="sass">
.is-fixed
  @apply fixed under-page-header mt-6

.is-abs
  @apply under-post-header

.left-aside
  @apply hidden xl:block
  @apply mt-6 mx-4 overflow-y-auto basis-56 w-56 shrink-0

.right-aside
  @apply hidden lg:block relative
  @apply mt-6 mx-4 overflow-y-auto basis-56 w-56 shrink-0
</style>
