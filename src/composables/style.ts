import { isMobile } from "~/utils/device"

const codeBlockStyles = `

`

export function useDynamicStyle() {
  if (!isMobile()) {
    const style = document.createElement("style")
    style.textContent = codeBlockStyles
    document.head.append(style)
  }
}
