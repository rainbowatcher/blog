<script lang="ts" setup>
import { useTags } from "../../src/composables/use-tags"
import { usePages } from "../../src/composables/use-pages"

const tags = useTags()
const pages = usePages()
</script>

<template>
  <main flex="~ col">
    <div max-w-4xl mxa my-8>
      <span
        bg-blue text-black select-none
        inline-block cursor-pointer outline="zinc-300 dark:zinc-600 solid 1"
        rounded-lg mr-2 px-2 mb-2 hover="bg-sky text-zinc-800 outline-none" @click="$router.push('/tags')"
      >Show All</span>
      <span
        v-for="i in tags" :key="i.name" inline-block cursor-pointer outline="zinc-300 dark:zinc-600 solid 1" select-none
        rounded-lg mr-2 px-2 mb-2 hover="bg-sky text-zinc-800 outline-none" @click="$router.push(`/tags/${(<string>i.name).toLowerCase()}`)"
      >
        {{ i.name }}<sup>{{ i.pages.length }}</sup>
      </span>
    </div>
    <PostList :pages="pages" />
  </main>
</template>
