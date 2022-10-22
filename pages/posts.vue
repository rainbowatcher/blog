<script lang="ts" setup>
const current = ref()
</script>

<template>
  <Header />
  <main pt-10rem>
    <router-view v-slot="{ Component }">
      <component :is="Component" :ref="current" />
    </router-view>
  </main>
  <div text-center>
    [post layout]
  </div>
  <Footer />
</template>
