// https://github.com/egoist/markdown-it-highlight-lines
import type Token from "markdown-it/lib/token"
import type MarkdownIt from "markdown-it/lib"

const RE = /{([\d,-]+)}/

export const highlightLines = (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, options, , self] = args
    const token = tokens[idx]

    if (!token.info || !RE.test(token.info))
      return fence(...args)

    const lineNumbers = RE.exec(token.info)![1]
      .split(",")
      .map(v => v.split("-").map(v => parseInt(v, 10)))
    const langName = token.info.replace(RE, "").trim()

    const code = options.highlight
      ? options.highlight(token.content, langName, "")
      : token.content

    let lineNumber = 0
    const codeSplits = code.split("\n").map((split) => {
      if (split === "<code>")
        lineNumber = 0
      if (split.includes("class=\"line\""))
        lineNumber += 1

      const inRange = lineNumbers.some(([start, end]) => {
        if (start && end)
          return lineNumber >= start && lineNumber <= end

        return lineNumber === start
      })
      if (inRange) {
        return {
          code: `<span class="highlighted-line">${split}</span>`,
          highlighted: true,
        }
      }
      return {
        code: split,
      }
    })
    let highlightedCode = ""
    codeSplits.forEach((split) => {
      if (split.highlighted)
        highlightedCode += split.code

      else
        highlightedCode += `${split.code}\n`
    })
    // If custom highlighter wraps code with starting <pre..., don't wrap code
    if (highlightedCode.startsWith("<pre"))
      return highlightedCode

    const tmpToken = {
      attrs: [["class", langName ? `language-${langName}` : ""]],
    }
    const attrs = self.renderAttrs(tmpToken as Token)
    // console.log(`<pre${attrs}><code${attrs}>${highlightedCode.trim()}</code></pre>`)
    return `<pre${attrs}><code${attrs}>${highlightedCode.trim()}</code></pre>`
  }
}
