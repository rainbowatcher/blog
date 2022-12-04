<script lang="ts" setup>
import Color from "color"
import type { Frontmatter } from "~/types"
const { meta: { frontmatter } } = useRoute()

const { title, subtitle, date, tags, headerMask, headerImage }: Frontmatter = frontmatter
const bgImg = `url(${decodeURIComponent(headerImage!)})`
const UNTITLED_WARN = "需要在设置 Frontmatter 中设置标题"
const dynamicHeaderMask = ref<string>()

const htmlTag = document.body.parentElement
const mutationObserver = new MutationObserver(callback)
function callback(_mutations: MutationRecord[], _observer: MutationObserver) {
  const isDark = htmlTag?.classList.contains("dark")
  if (isDark) {
    dynamicHeaderMask.value = Color(headerMask).opaquer(0.3).toString()
  } else {
    dynamicHeaderMask.value = headerMask
  }
}
mutationObserver.observe(htmlTag!, { attributes: true })

onUnmounted(() => {
  mutationObserver.disconnect()
})
</script>

<template>
  <div class="article-header h-27rem bg-center-cover relative">
    <div v-if="headerMask" class="article-header-mask absolute w-full h-full z1" />
    <div class="article-header-content relative mx-auto p-(y8rem x2.5rem) max-w-800px z22 h-full">
      <div class="article-header-tags flex gap2 mb-4 text-2">
        <span v-for="tag in tags" :key="tag" border rounded-2xl px-2 py-1>
          {{ tag }}
        </span>
      </div>
      <h1 class="mb-10 text-3.5rem font-bold lh-4rem">
        {{ title ?? UNTITLED_WARN }}
      </h1>
      <p v-if="subtitle" class="opacity-50 italic">
        {{ subtitle }}
      </p>
      <div v-if="date" class="text-sm opacity-90 flex flex-row items-center lh-8">
        <span class="i-carbon-calendar" mr-2 />
        <p>{{ useDateFormat(date, 'YYYY-MM-DD').value }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.article-header {
  background-image: v-bind(bgImg);
  color: white;
}
.article-header-mask {
  background-color: v-bind(dynamicHeaderMask);
}
</style>
