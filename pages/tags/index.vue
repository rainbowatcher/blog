<script lang="ts" setup>
import { useTags } from "../../src/composables/use-tags"
import { usePages } from "../../src/composables/use-pages"

const tags = useTags()
const pages = usePages()
</script>

<template>
  <main flex="~ col">
    <div mxa my-8 max-w-4xl>
      <span

        outline="zinc-300 dark:zinc-600 solid 1"
        mb-2 mr-2 inline-block cursor-pointer select-none rounded-lg bg-blue px-2 text-black hover="bg-sky text-zinc-800 outline-none" @click="$router.push('/tags')"
      >Show All</span>
      <span
        v-for="i in tags" :key="i.name" outline="zinc-300 dark:zinc-600 solid 1"
        mb-2 mr-2 inline-block cursor-pointer select-none rounded-lg px-2 hover="bg-sky text-zinc-800 outline-none" @click="$router.push(`/tags/${(<string>i.name).toLowerCase()}`)"
      >
        {{ i.name }}<sup>{{ i.pages.length }}</sup>
      </span>
    </div>
    <PostList :pages="pages" />
  </main>
</template>
