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
  <div
    flex="~ col gap-y-4" class="w-4/6"
    container max-w-screen-2xl m-auto
  >
    <div v-for="page in pages" :key="page.link" class="post-item" w-auto>
      <section flex-row p4>
        <RouterLink :to="page.link">
          {{ page.title }}
        </RouterLink>
        <br>
        <small>{{ `${(page.date)} ` }}</small>
        <small v-for="tag in page.tags" :key="tag">{{ `#${tag} ` }}</small>
        <p v-if="page.excerpt" text-sm text-gray>
          {{ page.excerpt }}
        </p>
      </section>
    </div>
  </div>
</template>

<style lang="scss">
.post-item {
  box-shadow: 0 3px 6px var(--sika-code-block-shadow-color1), 0 8px 15px var(--sika-code-block-shadow-color2), 0 0 0 1px var(--sika-code-block-border-color);
  border-radius: 8px;
  transition: .5s;

  &:hover{
    box-shadow: 0 3px 6px var(--sika-code-block-shadow-color1), 0 15px 25px var(--sika-code-block-shadow-color2), 0 0 0 1px var(--sika-code-block-border-color);
  }
}
</style>
