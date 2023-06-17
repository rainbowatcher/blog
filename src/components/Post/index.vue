<script setup lang='ts'>
import "katex/dist/katex.min.css"

// const content = ref<HTMLDivElement>()
</script>

<template>
  <article class="my-8 max-w-4xl min-w-0 w-full shrink md:p-x1.5rem">
    <slot />
  </article>
</template>

<style lang="sass">
@import "../../styles/markdown"
@import "../../styles/code-group"
</style>
