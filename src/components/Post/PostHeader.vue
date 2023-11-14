<script lang="ts" setup>
import Color from "color"
import { randomColor } from "~/utils/color"

defineProps({
  title: String,
})

const { meta: { frontmatter, author, updateTime } } = useRoute()

const bgImg = frontmatter.headerImage ? `url(${decodeURIComponent(frontmatter.headerImage!)})` : ""
const from = randomColor("hex", .6)
const to = randomColor("hex", .6)
const headerImageMask = computed(() => {
  const defaultMask = frontmatter.headerMask ?? "rgba(0, 0, 0, .4)"
  return isDark.value ? Color(defaultMask).opaquer(0.3).toString() : defaultMask
})
</script>

<template>
  <div
    class="post-header"
    :class="[bgImg ? 'has-bg-image' : 'default-bg-image', frontmatter.layout === 'post' ? 'h[--sika-h-post-header]' : 'h[--sika-h-default-header]']"
    :style="{
      '--sika-c-default-post-bg-from': from,
      '--sika-c-default-post-bg-to': to,
    }"
  >
    <div class="post-header-mask absolute inset-0 z1 h-full w-full" :style="{ 'background-color': headerImageMask }" />
    <div class="post-header-content" :class="[frontmatter.layout === 'post' ? 'is-post' : '']">
      <div class="post-header-tags mb-4 h8">
        <Tag v-for="tag in frontmatter.tags" :key="tag" :label="tag" type="outline" mr-2 outline-white />
      </div>
      <h1
        v-if="frontmatter.title"
        class="post-header-title font-bold lt-md:mb-4 md:mb-6 lt-md-text-3xl md-text-6xl md-leading-tight"
      >
        {{ frontmatter.title }}
      </h1>
      <h1 v-else-if="title" class="post-header-page-title mb-4 text-center font-bold lh-1em lt-md:text-2rem md:text-3.5rem">
        {{ title }}
      </h1>
      <p v-if="frontmatter.subtitle" class="post-header-subtitle italic">
        {{ frontmatter.subtitle }}
      </p>
      <div
        v-if="frontmatter.layout === 'post' && author"
        class="post-header-meta items-center gap2 text-sm opacity-90 lt-md:(lh-6) md:(lh-8)"
      >
        <div flex="inline" mr-4 items-center gap-2>
          <span class="i-carbon-user" />
          <p>{{ author }}</p>
        </div>
        <div flex="inline" mr-4 items-center gap-2>
          <span class="i-carbon-calendar" />
          <p>{{ useDateFormat(frontmatter.date, 'YYYY-MM-DD').value }}</p>
        </div>
        <div flex="inline" mr-4 items-center gap-2>
          <span class="i-carbon-time" />
          <p>{{ useDateFormat(updateTime, 'YYYY-MM-DD').value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-header {
  color: #e5e5e5;
  @apply relative max-w-full w-full bg-center-cover;
}

.has-bg-image {
  background-image: v-bind(bgImg);
}

.default-bg-image {
  background-image: linear-gradient(to bottom right, var(--sika-c-default-post-bg-from), var(--sika-c-default-post-bg-to));
}

.post-header-content {
  position: relative;
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
  max-width: 56rem;
  height: 100%;
  padding-top: 3rem;

  &.is-post {
    @media (min-width: 768px) {
      padding: 8rem 0 0 1.5rem !important;
    }

    @media (max-width: 767.9px) {
      padding: 5.5rem 0 0 1.5rem;
    }
  }
}
</style>
