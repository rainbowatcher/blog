import type { RouteRecordRaw } from "vue-router"

export function dynamicRoute(paths: string[], routes: readonly RouteRecordRaw[]) {
    // vite-ssg will not auto include dynamic route
    const posts = routes.find(r => r.name === "posts")
    posts?.children?.forEach((post) => {
        post.meta?.frontmatter.tags?.forEach((t: string) => {
            const path = `/tags/${t.toLocaleLowerCase()}`
            if (!paths.includes(path)) {
                paths.push(path)
            }
        })
    })
    return paths
}
