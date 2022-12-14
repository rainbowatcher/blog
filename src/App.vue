<script setup lang="ts">
import style from "./styles/theme/common.sass"
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,

// they will be rendered correctly in the html results with vite-ssg
const { head } = useConfig()
useHead(head)
</script>

<template>
  <RouterView />
</template>
