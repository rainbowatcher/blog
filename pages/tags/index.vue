<script lang="ts" setup>
import { useTags } from "../../src/composables/use-tags"
import { usePages } from "../../src/composables/use-pages"

const tags = useTags()
const pages = usePages()
</script>

<template>
  <section flex="~ col">
    <TagList :tags="tags" />
    <PostList :pages="pages" />
  </section>
</template>
