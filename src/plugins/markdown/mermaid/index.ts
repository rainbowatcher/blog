// ref: https://github.com/mermaid-js/mermaid/blob/develop/packages/mermaid/src/docs/.vitepress/mermaid-markdown-all.ts
import type MarkdownIt from "markdown-it"

export function mermaidPlugin(md: MarkdownIt) {
    const defaultRenderer = md.renderer.rules.fence

    if (!defaultRenderer) {
        throw new Error("defaultRenderer is undefined")
    }

    md.renderer.rules.fence = (tokens, index, options, env, slf) => {
        const token = tokens[index]

        if (token.info.trim() === "mermaid-example") {
            if (!md.options.highlight) {
                // this function is always created by vitepress, but we need to check it
                // anyway to make TypeScript happy
                throw new Error(
                    "Missing MarkdownIt highlight function",
                )
            }

            // doing ```mermaid-example {line-numbers=5 highlight=14-17} is not supported
            const langAttrs = ""
            return `
      <h5>Code:</h5>
      <div class="language-mermaid">
        <button class="copy"></button>
        <span class="lang">mermaid</span>
        ${md.options.highlight(token.content, "mermaid", langAttrs)}
      </div>`
        }
        else if (token.info.trim() === "mermaid") {
            const key = index
            return `
      <Suspense>
      <template #default>
      <Mermaid id="mermaid-${key}" graph="${encodeURIComponent(token.content)}"></Mermaid>
      </template>
        <!-- loading state via #fallback slot -->
        <template #fallback>
          Loading...
        </template>
      </Suspense>
`
        }

        return defaultRenderer(tokens, index, options, env, slf)
    }
}
