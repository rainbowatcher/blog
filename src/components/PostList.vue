<script lang="ts" setup>
const router = useRouter()
const pages = router.getRoutes()
  .filter(i => i.path.startsWith("/posts") && !i.meta.frontmatter.hide)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
  .map(i => ({
    link: i.path,
    title: i.meta.frontmatter.title || "Untitled",
    excerpt: i.meta.frontmatter.excerpt,
    // headerImage: i.meta.frontmatter.headerImage,
    tags: i.meta.frontmatter.tags,
    date: i.meta.frontmatter.date ? useDateFormat(i.meta.frontmatter.date, "YYYY-MM-DD").value : "",
  }))
</script>

<template>
  <div flex="~ col" max-w-4xl mxa divide="zinc500/30 y">
    <div v-for="page in pages" :key="page.link" class="post-item" w-auto>
      <section flex-row p4>
        <RouterLink :to="page.link">
          <p class="font-[SmileySans-Oblique] text-sky-500 text-xl">
            {{ page.title }}
          </p>
        </RouterLink>
        <small v-for="tag in page.tags" :key="tag">{{ `#${tag} ` }}</small>
        <small>{{ `${(page.date)} ` }}</small>
        <p v-if="page.excerpt" text-sm text-gray>
          {{ page.excerpt }}
        </p>
      </section>
    </div>
  </div>
</template>
