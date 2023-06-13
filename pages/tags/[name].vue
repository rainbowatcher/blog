<script lang="ts" setup>
import { useRoute } from "vue-router"

const route = useRoute()
console.log(route.params.name)
</script>

<template>
  {{ "hello" }}
</template>

<style scoped>

</style>
