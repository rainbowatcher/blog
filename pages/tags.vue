<script lang="ts" setup>
const map = new Map<string, number>()
useRouter().getRoutes().filter(route => route.meta.frontmatter && route.meta.frontmatter.tags)
  .forEach((route) => {
    const tags: string[] = route.meta.frontmatter.tags
    tags.forEach((tag) => {
      const num = map.get(tag) || 0
      map.set(tag, num + 1)
    })
  })
</script>

<template>
  <Header />
  <PostHeading />
  <div>
    <span v-for="i in map" :key="i[0]" inline-block outline-white-solid outline-1 rounded-lg mr-2>
      {{ i[0] }}
    </span>
  </div>
</template>
