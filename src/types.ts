import { type ViteSSGContext } from 'vite-ssg'
import type { UseHeadInput } from '@vueuse/head'

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
  title: string
  excerpt: string
  date: string | Date
  headerImage: string
  headerMask: string
  [key: string]: unknown
}
