<script lang="ts" setup>
import { computed } from "vue"
import { useTags } from "../../src/composables/use-tags"

const props = defineProps<{name:string}>()
const tags = useTags()
const currentTag = computed(() => tags.find(i => i.name.toLowerCase() === props.name))
</script>

<template>
  <section flex="~ col">
    <TagList :tags="tags" />
    <p v-if="!currentTag?.pages">
      Empty
    </p>
    <PostList v-else :pages="currentTag?.pages" />
  </section>
</template>
