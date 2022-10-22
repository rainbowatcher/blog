// // const path = resolve(__dirname, route.component.slice(1))

// import type { InjectionKey, Ref } from 'vue'
// import type { SiteData } from '~/types'

// // if (!path.includes('projects.md')) {
// //   const md = fs.readFileSync(path, 'utf-8')
// //   const { data, excerpt } = matter(md, { excerpt_separator: '<!-- more -->' })
// //   const frontmatter = { frontmatter: Object.assign(data, { excerpt }) }
// //   route.meta = Object.assign(route.meta || {}, frontmatter)
// // }

// export const dataSymbol: InjectionKey<VitePressData> = Symbol('data')

// export interface PageData {
//   relativePath: string
//   title: string
//   titleTemplate?: string | boolean
//   description: string
//   headers: Header[]
//   frontmatter: Record<string, any>
//   lastUpdated?: number
// }

// export interface Header {
//   /**
//    * The level of the header
//    *
//    * `1` to `6` for `<h1>` to `<h6>`
//    */
//   level: number
//   /**
//    * The title of the header
//    */
//   title: string
//   /**
//    * The slug of the header
//    *
//    * Typically the `id` attr of the header anchor
//    */
//   slug: string
//   /**
//    * Link of the header
//    *
//    * Typically using `#${slug}` as the anchor hash
//    */
//   link: string
//   /**
//    * The children of the header
//    */
//   children: Header[]
// }

// export interface VitePressData<T = any> {
//   site?: Ref<SiteData<T>>
//   page: Ref<PageData>
//   theme: Ref<T>
//   frontmatter: Ref<PageData['frontmatter']>
//   title: Ref<string>
//   description: Ref<string>
//   lang: Ref<string>
//   localePath: Ref<string>
// }

// // site data is a singleton
// export const siteDataRef: Ref<SiteData> = shallowRef(
//   (import.meta.env.PROD ? siteData : readonly(siteData)) as SiteData,
// )

// // hmr
// if (import.meta.hot) {
//   import.meta.hot.accept('/@siteData', (m) => {
//     if (m)
//       siteDataRef.value = m.default
//   })
// }

// // per-app data
// export function initData(route: Route): VitePressData {
//   // const site = computed(() =>
//   //   resolveSiteDataByRoute(siteDataRef.value, route.path),
//   // )

//   return {
//     // site,
//     // theme: computed(() => site.value.themeConfig),
//     // page: computed(() => route.data),
//     frontmatter: computed(() => route.data.frontmatter),
//     lang: computed(() => site.value.lang),
//     localePath: computed(() => {
//       const { langs, lang } = site.value
//       const path = Object.keys(langs).find(
//         langPath => langs[langPath].lang === lang,
//       )
//       return withBase(path || '/')
//     }),
//     title: computed(() => {
//       return createTitle(site.value, route.data)
//     }),
//     description: computed(() => {
//       return route.data.description || site.value.description
//     }),
//   }
// }

// export function useData<T = any>(): VitePressData<T> {
//   const data = inject(dataSymbol)
//   if (!data)
//     throw new Error('vitepress data not properly injected in app')

//   return data
// }
