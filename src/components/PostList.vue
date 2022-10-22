<script lang="ts" setup>
const router = useRouter()
const pages = router.getRoutes()
  .filter(i => i.path.startsWith('/posts') && !i.meta.frontmatter.hide)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
  .map(i => ({
    link: i.path,
    title: i.meta.frontmatter.title || 'Untitled',
    excerpt: i.meta.frontmatter.excerpt,
    // headerImage: i.meta.frontmatter.headerImage,
    tags: i.meta.frontmatter.tags,
    date: i.meta.frontmatter.date ? useDateFormat(i.meta.frontmatter.date, 'YYYY-MM-DD').value : '',
  }))
</script>

<template>
  <div
    flex="~ col gap-2" class="w-4/6"
    container max-w-screen-2xl m-auto
    divide="dashed y coolgray-500"
  >
    <div v-for="page in pages" :key="page.link" w-auto>
      <section flex-row p4>
        <RouterLink :to="page.link">
          {{ page.title }}
        </RouterLink>
        <br>
        <small>{{ `${(page.date)} ` }}</small>
        <p v-if="page.excerpt" text-sm text-gray>
          {{ page.excerpt }}
        </p>
      </section>
    </div>
  </div>
</template>
