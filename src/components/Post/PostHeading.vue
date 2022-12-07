<script lang="ts" setup>
import Color from "color"
defineProps({
  pageTitle: String,
})

const { meta: { frontmatter, author, updateTime } } = useRoute()

const bgImg = frontmatter.headerImage ? `url(${decodeURIComponent(frontmatter.headerImage!)})` : ""
const dynamicHeaderMask = ref<string>(frontmatter.headerMask)
const htmlTag = ref<HTMLElement | null>(null)
const observer = shallowRef<MutationObserver>()
function callback(_mutations: MutationRecord[], _observer: MutationObserver) {
  const isDark = htmlTag.value?.classList.contains("dark")
  if (isDark && frontmatter.headerMask) {
    dynamicHeaderMask.value = Color(frontmatter.headerMask).opaquer(0.3).toString()
  } else {
    dynamicHeaderMask.value = frontmatter.headerMask
  }
}
onMounted(() => {
  observer.value = new MutationObserver(callback)
  htmlTag.value = document.body.parentElement
  observer.value.observe(htmlTag.value!, { attributes: true })
})

onUnmounted(() => {
  observer.value?.disconnect()
})
</script>

<template>
  <div class="article-header h-27rem bg-center-cover relative max-w-full" :class="{ 'has-bg-image': bgImg }">
    <div class="article-header-mask absolute w-full h-full z1 top-0" :class="{ 'has-mask': dynamicHeaderMask }" />
    <div class="article-header-content relative mx-auto p-(y8rem x2.5rem) max-w-4xl z1 h-full">
      <div class="article-header-tags flex gap2 mb-4 text-2">
        <span v-for="tag in frontmatter.tags" :key="tag" class="border rounded-2xl px-2 py-1">
          {{ tag }}
        </span>
      </div>
      <h1 v-if="frontmatter.title" class="article-header-title mb-10 text-3.5rem font-bold lh-4rem">
        {{ frontmatter.title }}
      </h1>
      <h1 v-if="pageTitle" class="article-header-page-title mb-10 text-3.5rem font-bold lh-4rem text-center">
        {{ pageTitle }}
      </h1>
      <p v-if="frontmatter.subtitle" class="article-header-subtitle opacity-50 italic">
        {{ frontmatter.subtitle }}
      </p>
      <div v-if="frontmatter.layout === 'post' && author" class="article-header-meta text-sm opacity-90 flex flex-row items-center lh-8 gap2">
        <div flex="inline" items-center gap-2 mr-4>
          <span class="i-carbon-user" />
          <p>{{ author }}</p>
        </div>
        <div flex="inline" items-center gap-2 mr-4>
          <span class="i-carbon-calendar" />
          <p>{{ useDateFormat(frontmatter.date, 'YYYY-MM-DD').value }}</p>
        </div>
        <div flex="inline" items-center gap-2 mr-4>
          <span class="i-carbon-time" />
          <p>{{ updateTime }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.has-bg-image {
  background-image: v-bind(bgImg);
  color: white;
}
.has-mask {
  background-color: v-bind(dynamicHeaderMask);
}
</style>
