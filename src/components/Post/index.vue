<script setup lang='ts'>
import "katex/dist/katex.min.css"

// const content = ref<HTMLDivElement>()
</script>

<template>
  <article class="min-w-0 max-w-4xl shrink w-full my-8 md:p-x1.5rem">
    <slot />
  </article>
</template>

<style lang="sass">
@import "../../styles/markdown"
@import "../../styles/code-group"
</style>
