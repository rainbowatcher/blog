<script lang="ts" setup>
import PostList from "../../src/components/PostList.vue"
import { useTags } from "../../src/composables/tags"
import { usePages } from "../../src/composables/use-pages"

const pages = usePages()
const tags = useTags()
</script>

<template>
  <PostLayout>
    <main flex="~ col">
      <div max-w-4xl mxa my-8>
        <span
          bg-blue text-black
          inline-block cursor-pointer outline="zinc-300 dark:zinc-600 solid 1"
          rounded-lg mr-2 px-2 mb-2 hover="bg-sky text-zinc-800 outline-none"
        >Show All</span>
        <span
          v-for="i in tags" :key="i.name" inline-block cursor-pointer outline="zinc-300 dark:zinc-600 solid 1"
          rounded-lg mr-2 px-2 mb-2 hover="bg-sky text-zinc-800 outline-none"
        >
          {{ i.name }}<sup>{{ i.pages.length }}</sup>
        </span>
      </div>
      <PostList :pages="pages" />
    </main>
  </PostLayout>
</template>

<style scoped>

</style>
