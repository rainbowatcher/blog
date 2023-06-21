// markdown-it plugin for generating line numbers.
// It depends on preWrapper plugin.

import type MarkdownIt from "markdown-it"
import type { LineNumberOptions } from "~/types"

// const lineRE = /<span.*class=".*line.*">/

const DEFAULT_OPTIONS: LineNumberOptions = {
  wrapperName: "line-numbers-wrapper",
  className: "line-number",
}

export function lineNumberPlugin(md: MarkdownIt, options: LineNumberOptions) {
  const fence = md.renderer.rules.fence!
  const { className, wrapperName } = { ...DEFAULT_OPTIONS, ...options }
  md.renderer.rules.fence = (...args) => {
    const rawCode = fence(...args)

    const lines = rawCode.slice(
      rawCode.indexOf("<code>"),
      rawCode.indexOf("</code>"),
    ).split("\n")

    const lineNumbersCode = [...Array(lines.length - 1)]
      .map(
        (_line, index) => `<span class="${className}" aria-hidden="true">${index + 1}</span><br>`,
      )
      .join("")

    const lineNumbersWrapperCode = `<div class="${wrapperName}">${lineNumbersCode}</div>`

    const finalCode = rawCode
      .replace(/<\/div>\s*?$/, `${lineNumbersWrapperCode}</div>`)
      .replace(/"(language-[^"]*?)"/, "\"$1 line-numbers-mode\"")

    return finalCode
  }
}
