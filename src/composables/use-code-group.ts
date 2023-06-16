import { isClient } from "@vueuse/core"


export function useCodeGroups() {
  if (isClient) {
    window.addEventListener("click", (e) => {
      const el = e.target as HTMLInputElement

      if (el.matches(".vp-code-group input")) {
        // input <- .tabs <- .vp-code-group
        const group = el.parentElement?.parentElement
        const i = Array.from(group?.querySelectorAll("input") || []).indexOf(el)

        const current = group?.querySelector('div[class*="language-"].active')
        const next = group?.querySelectorAll(
          'div[class*="language-"]:not(.language-id)',
        )?.[i]

        if (current && next && current !== next) {
          current.classList.remove("active")
          next.classList.add("active")
        }
      }
    })
  }
}
