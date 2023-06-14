<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <PageHeader />
  <PostHeader />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>
