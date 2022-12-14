<script lang="ts" setup>
import Color from "color"
defineProps({
  pageTitle: String,
})

const { meta: { frontmatter, author, updateTime } } = useRoute()

const bgImg = frontmatter.headerImage ? `url(${decodeURIComponent(frontmatter.headerImage!)})` : ""
const dynamicHeaderMask = ref<string>(frontmatter.headerMask)

watch(isDark, () => {
  if (isDark.value && frontmatter.headerMask) {
    dynamicHeaderMask.value = Color(frontmatter.headerMask).opaquer(0.3).toString()
  } else {
    dynamicHeaderMask.value = frontmatter.headerMask
  }
})
</script>

<template>
  <div
    class="article-header lt-md:h-20rem md-h-27rem bg-center-cover relative max-w-full"
    :class="{ 'has-bg-image': bgImg, 'default-bg-image': !bgImg }"
  >
    <div class="article-header-mask" :class="{ 'has-mask': dynamicHeaderMask }" />
    <div class="article-header-content">
      <div class="article-header-tags flex gap2 mb-4 text-2">
        <span v-for="tag in frontmatter.tags" :key="tag" class="border rounded-2xl px-2 py-1 text-white">
          {{ tag }}
        </span>
      </div>
      <h1
        v-if="frontmatter.title"
        class="article-header-title lt-md:mb-4 md:mb-10 text-white lt-md:text-2rem md:text-3.5rem font-bold md:lh-4rem"
      >
        {{ frontmatter.title }}
      </h1>
      <h1 v-if="pageTitle" class="article-header-page-title mb-4 text-3.5rem text-white font-bold lh-4rem text-center">
        {{ pageTitle }}
      </h1>
      <p v-if="frontmatter.subtitle" class="article-header-subtitle opacity-50 italic">
        {{ frontmatter.subtitle }}
      </p>
      <div
        v-if="frontmatter.layout === 'post' && author"
        class="article-header-meta lt-md:(lh-6) md:(lh-8) text-sm opacity-90 items-center gap2"
      >
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
          <p>{{ useDateFormat(updateTime, 'YYYY-MM-DD').value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.has-bg-image
  background-image: v-bind(bgImg)
  color: white

.default-bg-image
  @apply bg-gradient-to-br from-teal-600 to-indigo-600

.has-mask
  background-color: v-bind(dynamicHeaderMask)

.article-header-mask
  @apply absolute w-full h-full z1 top-0

.article-header-content
  @apply relative mx-auto lt-md:p-(y6rem x1.5rem) md:p-(y-8rem x-10) max-w-4xl z1 h-full
</style>
