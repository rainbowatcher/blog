import type { RouteRecordRaw } from "vue-router"

export function resolveHiddenPost(routes: RouteRecordRaw[]) {
  routes = routes.map((r: RouteRecordRaw) => {
    if (r.name === "posts") {
      r.children = r.children?.filter(i => !i.meta?.frontmatter.hide)
    }
    return r
  })
  return routes
}
