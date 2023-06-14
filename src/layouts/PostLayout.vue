<script lang="ts" setup>
const asideClass = useAsidePos()
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
