import type MarkdownIt from "markdown-it"
import LinkAttributes from "markdown-it-link-attributes"
import anchor from "markdown-it-anchor"
import { light as emoji } from "markdown-it-emoji"
import footnote from "markdown-it-footnote"
import mark from "markdown-it-mark"
import { slugify } from "../utils"
import {
  containerPlugin,
  highlight,
  highlightLinePlugin,
  imagePlugin,
  katexPlugin,
  lineNumberPlugin,
  mermaidPlugin,
  preWrapperPlugin,
} from "./markdown"

export function markdownEnhance(md: MarkdownIt) {
  md.use(LinkAttributes, {
    matcher: (link: string) => /^https?:\/\//.test(link),
    attrs: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
  })
    .use(containerPlugin)
    // related: antfu/antfu.me
    // https://github.com/valeriangalliat/markdown-it-anchor
    .use(anchor, {
      level: 1,
      slugify,
      permalink: anchor.permalink.linkInsideHeader({
        symbol: "#",
        renderAttrs: () => ({ "aria-hidden": "true" }),
        placement: "before",
      }),
    })
    .use(preWrapperPlugin)
    .use(highlightLinePlugin)
    .use(lineNumberPlugin)
    .use(imagePlugin)
    .use(katexPlugin)
    .use(mermaidPlugin)
    .use(emoji)
    .use(footnote)
    .use(mark)
}
