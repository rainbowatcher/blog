<script lang="ts" setup>
import Color from "color"
import { randomColor } from "~/utils/color"

defineProps({
  pageTitle: String,
})

const { meta: { frontmatter, author, updateTime } } = useRoute()

const bgImg = frontmatter.headerImage ? `url(${decodeURIComponent(frontmatter.headerImage!)})` : ""
const defaultMask = computed(() => frontmatter.headerMask ?? "rgba(0, 0, 0, .4)")
const dynamicHeaderMask = ref<string>(defaultMask.value)

watch(isDark, () => {
  if (isDark.value) {
    dynamicHeaderMask.value = Color(defaultMask.value).opaquer(0.3).toString()
  } else {
    dynamicHeaderMask.value = defaultMask.value
  }
})

const from = randomColor()
const to = randomColor()
</script>

<template>
  <div
    class="post-header relative max-w-full w-full bg-center-cover lt-md:h-20rem md-h-27rem"
    :class="[bgImg ? 'has-bg-image' : 'default-bg-image']"
  >
    <div class="post-header-mask" />
    <div class="post-header-content">
      <div v-if="frontmatter.tags" class="post-header-tags mb-4 flex gap2 text-2">
        <span
          v-for="tag in frontmatter.tags" :key="tag" class="h5 cursor-pointer border rounded-2xl px-2 leading-5"
          @click="$router.push(`/tags/${tag.toLowerCase()}`)"
        >
          {{ tag }}
        </span>
      </div>
      <h1
        v-if="frontmatter.title"
        class="post-header-title h-2em font-bold lt-md:mb-4 md:mb-10 lt-md:text-2rem md:text-3.5rem md:lh-1em"
      >
        {{ frontmatter.title }}
      </h1>
      <h1 v-else-if="pageTitle" class="post-header-page-title mb-4 h-2em text-center text-3.5rem font-bold lh-1em">
        {{ pageTitle }}
      </h1>
      <!-- TODO: maybe we should remove it, it look like useless -->
      <p v-if="frontmatter.subtitle" class="post-header-subtitle italic opacity-75">
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

  @media (max-width: 767.9px) {
    height: 20rem;
  }

  @media (min-width: 768px) {
    margin-bottom: 2.5rem;
  }
}

.has-bg-image {
  background-image: v-bind(bgImg);
}

.default-bg-image {
  --sika-c-default-post-bg-from: v-bind(from);
  --sika-c-default-post-bg-to: v-bind(to);
  background-image: linear-gradient(to bottom right, var(--sika-c-default-post-bg-from), var(--sika-c-default-post-bg-to));
}

.post-header-mask {
  @apply absolute w-full h-full z1 top-0;
  background-color: v-bind(dynamicHeaderMask);
}

.post-header-content {
  position: relative;
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
  max-width: 56rem;
  height: 100%;

  @media (min-width: 768px) {
    padding: 10rem 0 0 1.5rem;
  }

  @media (max-width: 767.9px) {
    padding: 8rem 0 0 1.5rem;
  }

  // @apply relative mx-auto lt-md:p-(y6rem x1.5rem) md:p-(y-8rem x-10) max-w-4xl z1 h-full;
}
</style>
