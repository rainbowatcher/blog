import { type ViteSSGContext } from "vite-ssg"
import type { UseHeadInput } from "@vueuse/head"
import type { RouteMeta } from "vue-router"

export type UserModule = (ctx: ViteSSGContext) => void

export type SiteConfig = {
  head: UseHeadInput<any>
  nav: Array<{ text: string; link: string }>
}

export type Frontmatter = {
  [key: string]: unknown
  layout: "post" | "home" | "Post" | "Home"
  permalinkPattern: string
  // TODO remove
  useHeaderImage: boolean
  title: string
  subtitle: string
  excerpt: string
  date: string | Date
  headerImage: string
  headerMask: string
  tags: string[]
}

export type TagInfo = {
  name: string
  // link?: string
  pages: RouteMeta[]
  color?: string
}

export type MenuItem = {
  level: number
  title: string
  link: string
  children?: MenuItem[]
}
