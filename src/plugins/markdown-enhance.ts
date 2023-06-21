import type MarkdownIt from "markdown-it"
import LinkAttributes from "markdown-it-link-attributes"
import anchor from "markdown-it-anchor"
import emoji from "markdown-it-emoji"
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

export async function markdownEnhance(md: MarkdownIt) {
  md.options.highlight = await highlight("one-dark-pro"),
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
    .use(highlightLinePlugin)
    .use(imagePlugin)
    .use(preWrapperPlugin)
    .use(lineNumberPlugin)
    .use(katexPlugin)
    .use(mermaidPlugin)
    .use(emoji)
    .use(footnote)
    .use(mark)
}
