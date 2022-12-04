<script lang="ts" setup>
const current = ref()
</script>

<template>
  <Header />
  <PostHeading />
  <main flex="~ row">
    <div>left</div>
    <div flex="1">
      <router-view v-slot="{ Component }">
        <component :is="Component" :ref="current" />
      </router-view>
    </div>
    <div>right</div>
  </main>
  <div text-center>
    [post layout]
  </div>
  <Footer />
</template>
