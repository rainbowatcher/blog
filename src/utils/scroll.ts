import { isClient } from "@vueuse/core"

export function scrollIntoAnchor(offset = 10) {
  if (isClient && location.hash) {
    const ele = document.querySelector(decodeURIComponent(location.hash))
    // @ts-expect-error-ts-2239
    const offsetTop = ele?.offsetTop
    if (offsetTop) {
      window.scroll({ top: (offsetTop - offset), behavior: "smooth" })
    } else {
      ele?.scrollIntoView({ behavior: "smooth" })
    }
  }
}
