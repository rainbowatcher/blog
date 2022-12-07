<script lang="ts" setup>
import DocAside from "~/components/DocAside.vue"

const current = ref()
</script>

<template>
  <Header />
  <PostHeading />
  <main flex="~ row nowrap" justify-center mx-auto sm:px-6 md:px-8>
    <div hidden md:block px-8 overflow-y-auto basis-20rem>
      {{ "" }}
    </div>
    <router-view v-slot="{ Component }">
      <component :is="Component" :ref="current" />
    </router-view>
    <div hidden lg:block px-8 overflow-y-auto basis-20rem relative>
      <DocAside />
    </div>
  </main>
  <div text-center>
    [post layout]
  </div>
  <Footer />
</template>
