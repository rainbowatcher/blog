<script lang="ts" setup>
import { computed } from "vue"
import { useTags } from "../../src/composables/use-tags"

const props = defineProps<{name:string}>()
const tags = useTags()
const currentTag = computed(() => tags.find(i => i.name.toLowerCase() === props.name))
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
    <p v-if="!currentTag.pages">
      Empty
    </p>
    <PostList v-else :pages="currentTag.pages" />
  </main>
</template>
