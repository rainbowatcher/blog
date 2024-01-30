import { isClient } from "@vueuse/core"

export function useCopyCode() {
  if (isClient) {
    const timeoutIdMap = new Map<HTMLElement, NodeJS.Timeout>()
    window.addEventListener("click", (e) => {
      const el = e.target as HTMLElement
      if (el.matches('div[class*="language-"] > button.copy')) {
        const parent = el.parentElement
        const sibling = el.nextElementSibling
          ?.nextElementSibling as HTMLPreElement | undefined
        if (!parent || !sibling) {
          return
        }

        const isShell = /language-(shellscript|shell|bash|sh|zsh)/.test(
          parent.className,
        )

        let text = ""

        sibling
          .querySelectorAll("span.line:not(.diff.remove)")
          .forEach((node) => { text += `${node.textContent || ""}\n` })
        text = text.slice(0, -1)

        if (isShell) {
          text = text.replace(/^\s*$ /gm, "").trim()
        }

        void copyToClipboard(text).then(() => {
          el.classList.add("copied")
          clearTimeout(timeoutIdMap.get(el))
          const timeoutId = setTimeout(() => {
            el.classList.remove("copied")
            el.blur()
            timeoutIdMap.delete(el)
          }, 2000)
          timeoutIdMap.set(el, timeoutId)
        })
      }
    })
  }
}

async function copyToClipboard(text: string) {
  try {
    return navigator.clipboard.writeText(text)
  }
  catch {
    const element = document.createElement("textarea")
    const previouslyFocusedElement = document.activeElement

    element.value = text

    // Prevent keyboard from showing on mobile
    element.setAttribute("readonly", "")

    element.style.contain = "strict"
    element.style.position = "absolute"
    element.style.left = "-9999px"
    element.style.fontSize = "12pt" // Prevent zooming on iOS

    const selection = document.getSelection()
    const originalRange = selection
      ? selection.rangeCount > 0 && selection.getRangeAt(0)
      : null

    document.body.appendChild(element)
    element.select()

    // Explicit selection workaround for iOS
    element.selectionStart = 0
    element.selectionEnd = text.length

    document.execCommand("copy")
    document.body.removeChild(element)

    if (originalRange) {
      selection!.removeAllRanges() // originalRange can't be truthy when selection is falsy
      selection!.addRange(originalRange)
    }

    // Get the focus back on the previously focused element, if any
    if (previouslyFocusedElement) {
      (previouslyFocusedElement as HTMLElement).focus()
    }
  }
}
