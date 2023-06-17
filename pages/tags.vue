<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <PageHeader />
  <PostHeader page-title="Tags" />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>
