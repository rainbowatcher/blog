import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import matter from "gray-matter"
import { getCreateTime, getGitStat, getUpdateTime } from "../utils/git"

export function extendRouteMeta(route: any) {
    if (route.component.endsWith(".md")) {
        if (route.frontmatter) {
            return route
        }
        const path = resolve(process.cwd(), route.component.slice(1))
        const md = readFileSync(path, "utf-8")
        const { author, email, commits } = getGitStat(path) || {}
        const createTime = getCreateTime(path)
        const updateTime = getUpdateTime(path)

        const { data, excerpt } = matter(md, {
            excerpt_separator: "<!-- more -->",
        })
        const frontmatter = {
            frontmatter: Object.assign(data, { excerpt }),
            author,
            email,
            commits,
            createTime,
            updateTime,
            path: route.path,
        }
        route.meta = Object.assign(route.meta || {}, frontmatter)
    }
    else {
        route.meta = { frontmatter: {} }
    }
    return route
}
