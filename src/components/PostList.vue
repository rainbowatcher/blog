<script lang="ts" setup>
import { PageInfo } from "~/composables/use-pages"

defineProps<{
  pages: PageInfo[]
}>()
</script>

<template>
  <div flex="~ col" mxa max-w-4xl w-full divide="zinc500/30 y">
    <div v-for="page in pages" :key="page.link" class="post-item" w-auto>
      <section flex-row p4>
        <RouterLink :to="page.link">
          <p class="text-xl font-[SmileySans-Oblique] text-sky-500">
            {{ page.title }}
          </p>
        </RouterLink>
        <Tag v-for="tag in page.tags" :key="tag" :label="tag" mr-1 />
        <small>{{ `${(page.date)} ` }}</small>
        <p v-if="page.excerpt" text-sm text-gray>
          {{ page.excerpt }}
        </p>
      </section>
    </div>
  </div>
</template>
