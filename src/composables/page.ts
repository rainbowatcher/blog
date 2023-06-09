export function scrollIntoAnchor(offset = 10) {
  if (location.hash) {
    const ele = document.querySelector(decodeURIComponent(location.hash))
    // @ts-expect-error-ts-2239
    const offsetTop = ele?.offsetTop
    if (offsetTop)
      window.scroll({ top: (offsetTop - offset), behavior: "smooth" })

    else ele?.scrollIntoView({ behavior: "smooth" })
  }
}

export function usePosts() {
  return useRouter().getRoutes().filter(route => route.meta.frontmatter.layout === "post")
    .map((route) => {
      const { path, meta: { frontmatter, author, createTime, commits, updateTime, email } } = route
      return {
        frontmatter,
        path,
        author,
        commits,
        createTime,
        updateTime,
        email,
      }
    })
    .sort((a, b) => +new Date(a.createTime) - +new Date(b.createTime))
}
