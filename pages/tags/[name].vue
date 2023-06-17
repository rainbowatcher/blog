<script lang="ts" setup>
import { computed } from "vue"
import { useTags } from "../../src/composables/use-tags"

const props = defineProps<{name:string}>()
const tags = useTags()
const currentTag = computed(() => tags.find(i => i.name.toLowerCase() === props.name))
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
    <p v-if="!currentTag.pages">
      Empty
    </p>
    <PostList v-else :pages="currentTag.pages" />
  </main>
</template>
