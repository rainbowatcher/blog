<script lang="ts" setup>
import type { TagInfo } from "~/types"

const { t } = useI18n()

const tags = useTags()
const posts = usePosts()
console.log(posts)
const currentTags = ref<TagInfo[]>([])
const filteredPages = computed(() => {
  if (currentTags.value.length === 0) {
    return posts.sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
  }
  return currentTags.value.flatMap(tag => tag.pages)
})

// usePageData()
const toggleTag = (tag: TagInfo) => {
  currentTags.value.push(tag)
}

const showAll = () => {
  currentTags.value = []
}

// TODO
// console.log(useRouter().getRoutes())
</script>

<template>
  <PageHeader />
  <PostHeader :page-title="t('button.tags')" />
  <div max-w-4xl mxa my-8>
    <span
      bg-blue text-black
      inline-block cursor-pointer outline="zinc-300 dark:zinc-600 solid 1"
      rounded-lg mr-2 px-2 mb-2 hover="bg-sky text-zinc-800 outline-none"
      @click="showAll"
    >Show All</span>
    <span
      v-for="i in tags" :key="i.name" inline-block cursor-pointer outline="zinc-300 dark:zinc-600 solid 1"
      rounded-lg mr-2 px-2 mb-2 hover="bg-sky text-zinc-800 outline-none" @click="toggleTag(i)"
    >
      {{ i.name }}<sup>{{ i.pages.length }}</sup>
    </span>
  </div>
  <div max-w-4xl mxa my-8 divide="zinc500/30 y">
    <div v-for="page in filteredPages" :key="page.path" my-2 p-2>
      <RouterLink :to="page.path">
        <p text-xl class="font-[SmileySans-Oblique] text-sky-500">
          {{ page.frontmatter.title }}
        </p>
      </RouterLink>
      <p text-sm>
        {{ page.frontmatter.subtitle }}
      </p>
      <p text-sm>
        {{ page.frontmatter.excerpt }}
      </p>
      <sub>
        {{ useDateFormat(page.frontmatter.date, "YYYY-MM-DD").value }}
      </sub>
    </div>
  </div>
  <Footer />
</template>
