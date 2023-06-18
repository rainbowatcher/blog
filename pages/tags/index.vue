<script lang="ts" setup>
import { useTags } from "../../src/composables/use-tags"
import { usePages } from "../../src/composables/use-pages"

const tags = useTags()
const pages = usePages()
</script>

<template>
  <section flex="~ col">
    <div mxa mt-8 max-w-4xl px4 text-balance>
      <Tag
        label="Show All" type="success" mb4 mr-2 transition-shadow-300 hover="shadow-[2px_1px_8px_2px_rgb(15,23,42,0.3)] dark:shadow-[2px_1px_8px_2px_rgb(100,116,139,.3)]"
        @click="$router.push('/tags')"
      />
      <Tag
        v-for="i in tags" :key="i.name" :label="i.name" :sup="i.pages.length"
        type="info" mb4 mr-2 transition-shadow-300
        hover="shadow-[2px_1px_8px_2px_rgba(0,0,0,0.3)] dark:shadow-[2px_1px_8px_2px_rgba(163,163,163,.3)]"
      />
    </div>
    <PostList :pages="pages" />
  </section>
</template>
