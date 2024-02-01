// markdown-it plugin for wrapping <pre> ... </pre>.
//
// If your plugin was chained before preWrapper, you can add additional element directly.
// If your plugin was chained after preWrapper, you can use these slots:
//   1. <!--beforebegin-->
//   2. <!--afterbegin-->
//   3. <!--beforeend-->
//   4. <!--afterend-->

import type MarkdownIt from "markdown-it"

export function preWrapperPlugin(md: MarkdownIt) {
    const fence = md.renderer.rules.fence!
    md.renderer.rules.fence = (...args) => {
        const [tokens, idx] = args
        const info = tokens[idx].info.trim()/* .replace(/-vue$/, "") */

        const lang = extractLang(info)
        const rawCode = fence(...args)
        return `<div class="language-${lang}${/ active( |$)/.test(info) ? " active" : ""}"><button title="Copy Code" class="copy"></button><span class="lang">${
            lang === "vue-html" ? "template" : lang
        }</span>${rawCode}</div>`
    }
}

export function extractLang(info: string) {
    return info
    // .replace(/:(no-)?line-numbers({| |$).*/, "")
        .replace(/(-vue|{| ).*$/, "")
    // .replace(/^vue-html$/, "template")
}
