// markdown-it plugin for normalizing image source
// add loading="lazy" in img tag

import type MarkdownIt from "markdown-it"
import { EXTERNAL_URL_RE } from "../../utils"

export function imagePlugin(md: MarkdownIt) {
    const imageRule = md.renderer.rules.image!
    md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        let url = token.attrGet("src")
        token.attrPush(["loading", "lazy"])
        if (url && !EXTERNAL_URL_RE.test(url)) {
            if (!/^\.?\//.test(url))
                url = `./${url}`
            token.attrSet("src", decodeURIComponent(url))
        }
        return imageRule(tokens, idx, options, env, self)
    }
}
