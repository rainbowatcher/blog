import type { App } from "vue"
import type { Router } from "vue-router"
import { routeRecordToPages } from "~/composables/use-pages"
import type { PageInfo } from "~/composables/use-pages"
import type { TagInfo, UserModule } from "~/types"

function setupTagMap(router: Router, app: App<Element>) {
  const tagMap = new Map<string, TagInfo>()
  router.getRoutes().forEach((route) => {
    const tags: string[] = route.meta.frontmatter?.tags
    if (tags) {
      tags.forEach((tag) => {
        const { pages } = tagMap.get(tag) || { name: "", pages: [] as PageInfo[] }
        const pageInfo = routeRecordToPages(route)
        pages.push(pageInfo)
        tagMap.set(tag, { name: tag, pages })
      })
    }
  })
  app.provide(tagMapSymbol, tagMap)
}

export const install: UserModule = ({ app, router, isClient }) => {
  setupTagMap(router, app)
}
