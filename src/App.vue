<script setup lang="ts">
import { scrollIntoAnchor } from "./utils/scroll"

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
usePrefetch()
nextTick(() => {
    scrollIntoAnchor()
    setupDetailsAnimation()
})
useCodeGroups()
useCopyCode()
</script>

<template>
    <RouterView />
</template>
