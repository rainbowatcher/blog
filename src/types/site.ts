import type { Head } from "@unhead/vue"
import { type ViteSSGContext } from "vite-ssg"
import type { PageInfo } from "~/composables/use-pages"

export type UserModule = (ctx: ViteSSGContext) => void

export type SiteConfig = {
  head: Head
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
  pages: PageInfo[]
  color?: string
}

export type MenuItem = {
  level: number
  title: string
  link: string
  children?: MenuItem[]
}
