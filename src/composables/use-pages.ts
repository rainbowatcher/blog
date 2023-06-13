
export function usePages() {
  return useRouter().getRoutes()
    .filter(i => i.path.startsWith("/posts") && !i.meta.frontmatter.hide)
    .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
    .map((route) => {
      const { path, meta: { frontmatter, author, commits, updateTime, email } } = route
      return {
        link: path,
        title: frontmatter.title || "Untitled",
        excerpt: frontmatter.excerpt,
        headerImage: frontmatter.headerImage,
        tags: frontmatter.tags,
        date: frontmatter.date ? useDateFormat(frontmatter.date, "YYYY-MM-DD").value : "",
        author,
        commits,
        updateTime,
        email,
      }
    })
}

export type PageInfo = ReturnType<typeof usePages>
