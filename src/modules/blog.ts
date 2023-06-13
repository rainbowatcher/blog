import type { App } from "vue"
import type { RouteMeta, Router } from "vue-router"
import type { TagInfo, UserModule } from "~/types"

function setupTagMap(router: Router, app: App<Element>) {
  const tagMap = new Map<string, TagInfo>()
  router.getRoutes().forEach((route) => {
    const tags: string[] = route.meta.frontmatter?.tags
    if (tags) {
      tags.forEach((tag) => {
        const { pages } = tagMap.get(tag) || { pages: [] as RouteMeta[] }
        pages.push(route.meta)
        tagMap.set(tag, { name: tag, pages })
      })
    }
  })
  app.provide(tagMapSymbol, tagMap)
}

export const install: UserModule = ({ app, router, isClient }) => {
  setupTagMap(router, app)
}
