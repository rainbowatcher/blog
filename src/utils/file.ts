import type { Awaitable } from "unocss"
import {
  type AsyncComponentLoader,
  h,
  onMounted,
  onUnmounted,
  shallowRef,
} from "vue"
import { EXTERNAL_URL_RE } from "./re"
import { isBrowser } from "./device"



// /**
//  * Join two paths by resolving the slash collision.
//  */
// export function joinPath(base: string, path: string): string {
//   return `${base}${path}`.replace(/\/+/g, "/")
// }


/**
 * Converts a url path to the corresponding js chunk filename.
 */
export function pathToFile(path: string): string {
  // const map: Record<string, string> = {}
  let pagePath = path.replace(/\.html$/, "")
  pagePath = decodeURIComponent(pagePath)
  pagePath = pagePath.replace(/\/$/, "/index") // /foo/ -> /foo/index
  if (import.meta.env.DEV) {
    // always force re-fetch content in dev
    pagePath += `?t=${Date.now()}`
  } else {
    // in production, each .md file is built into a .md.js file following
    // the path conversion scheme.
    // /foo/bar.html -> ./foo_bar.md
    if (isBrowser) {
      const base = import.meta.env.BASE_URL
      pagePath =
        `${sanitizeFileName(
          pagePath.slice(base.length).replace(/\//g, "_") || "index",
        )}.md`
      // client production build needs to account for page hash, which is
      // injected directly in the page's html
      // let pageHash = __VP_HASH_MAP__[pagePath.toLowerCase()]
      // if (!pageHash) {
      //   pagePath = pagePath.endsWith("_index.md")
      //     ? `${pagePath.slice(0, -9)}.md`
      //     : `${pagePath.slice(0, -3)}_index.md`
      //   pageHash = __VP_HASH_MAP__[pagePath.toLowerCase()]
      // }
      // pagePath = `${base}assets/${pagePath}.${pageHash}.js`
    } else {
      // ssr build uses much simpler name mapping
      pagePath = `./${sanitizeFileName(
        pagePath.slice(1).replace(/\//g, "_"),
      )}.md.js`
    }
  }

  return pagePath
}

// export let contentUpdatedCallbacks: Array<() => any> = []

// /**
//  * Register callback that is called every time the markdown content is updated
//  * in the DOM.
//  */
// export function onContentUpdated(fn: () => any) {
//   contentUpdatedCallbacks.push(fn)
//   onUnmounted(() => {
//     contentUpdatedCallbacks = contentUpdatedCallbacks.filter(f => f !== fn)
//   })
// }

// export function defineClientComponent(
//   loader: AsyncComponentLoader,
//   args?: any[],
//   cb?: () => Awaitable<void>,
// ) {
//   return {
//     setup() {
//       const comp = shallowRef()
//       onMounted(async () => {
//         let res = await loader()
//         // interop module default
//         if (res && (res.__esModule || res[Symbol.toStringTag] === "Module")) {
//           res = res.default
//         }
//         comp.value = res
//         await cb?.()
//       })
//       return () => (comp.value ? h(comp.value, ...(args ?? [])) : null)
//     },
//   }
// }


// https://github.com/rollup/rollup/blob/main/src/utils/sanitizeFileName.ts

// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g
const DRIVE_LETTER_REGEX = /^[a-z]:/i

export function sanitizeFileName(name: string): string {
  const match = DRIVE_LETTER_REGEX.exec(name)
  const driveLetter = match ? match[0] : ""

  // A `:` is only allowed as part of a windows drive letter (ex: C:\foo)
  // Otherwise, avoid them because they can refer to NTFS alternate data streams.
  return driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "_")
}
