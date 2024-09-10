<script lang="ts" setup>
import { usePages } from "../../src/composables/use-pages"
import { useTags } from "../../src/composables/use-tags"

const tags = useTags()
const pages = usePages()
</script>

<template>
    <section flex="~ col">
        <TagList :tags="tags" />
        <PostList :pages="pages" />
    </section>
</template>
