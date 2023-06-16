<script setup lang="ts">
import { scrollIntoAnchor } from "./utils/scroll"

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,

// they will be rendered correctly in the html results with vite-ssg
const { head } = useConfig()
useHead(head)
usePrefetch(useRouter())
nextTick(() => {
  scrollIntoAnchor()
})
useCodeGroups()
useCopyCode()
</script>

<template>
  <RouterView />
</template>
