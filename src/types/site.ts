import { type ViteSSGContext } from "vite-ssg"
import type { UseHeadInput } from "@vueuse/head"

export type UserModule = (ctx: ViteSSGContext) => void

export interface SiteConfig {
  head: UseHeadInput<any>
  nav: { text: string; link: string }[]
}

export interface SiteData<ThemeConfig = any> {
  title: string
  themeConfig: ThemeConfig
}

export interface Frontmatter {
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
  [key: string]: unknown
}
