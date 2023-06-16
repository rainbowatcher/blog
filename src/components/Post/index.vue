<script setup lang='ts'>
import "katex/dist/katex.min.css"
// import "~/styles/markdown.sass"
// const { frontmatter } = defineProps({
//   frontmatter: {
//     type: Object,
//     required: true,
//   },
// })
const content = ref<HTMLDivElement>()
</script>

<template>
  <article ref="content" class="min-w-0 max-w-4xl shrink w-full my-8 md:p-x1.5rem">
    <slot />
  </article>
</template>

<style lang="sass">
@import "../../styles/markdown"
@import "../../styles/code-group"
</style>
