import type MarkdownIt from "markdown-it"
import type { RenderRule } from "markdown-it/lib/renderer"
import type Token from "markdown-it/lib/token"
import container from "markdown-it-container"
import { nanoid } from "nanoid"
import { extractLang } from "./pre-wrapper"

export function containerPlugin(md: MarkdownIt) {
    md.use(...createContainer("tip", "TIP", md))
        .use(...createContainer("info", "INFO", md))
        .use(...createContainer("warning", "WARNING", md))
        .use(...createContainer("danger", "DANGER", md))
        .use(...createContainer("details", "Details", md))
    // explicitly escape Vue syntax
        .use(container, "v-pre", {
            render: (tokens: Token[], idx: number) =>
                tokens[idx].nesting === 1 ? "<div v-pre>\n" : "</div>\n",
        })
        .use(container, "raw", {
            render: (tokens: Token[], idx: number) =>
                tokens[idx].nesting === 1 ? "<div class=\"vp-raw\">\n" : "</div>\n",
        })
        .use(...createCodeGroup())
}

type ContainerArgs = [typeof container, string, { render: RenderRule }]

function createContainer(
    clazz: string,
    defaultTitle: string,
    md: MarkdownIt,
): ContainerArgs {
    return [
        container,
        clazz,
        {
            render(tokens, idx) {
                const token = tokens[idx]
                const info = token.info.trim().slice(clazz.length).trim()
                if (token.nesting === 1) {
                    const title = md.renderInline(info || defaultTitle)
                    if (clazz === "details")
                        return `<details class="${clazz} custom-block"><summary>${title}</summary><div class="content">\n`

                    return `<div class="${clazz} custom-block"><p class="custom-block-title">${title}</p>\n`
                }
                else {
                    return clazz === "details" ? "</div></details>\n" : "</div>\n"
                }
            },
        },
    ]
}

function createCodeGroup(): ContainerArgs {
    return [
        container,
        "code-group",
        {
            render(tokens, idx) {
                if (tokens[idx].nesting === 1) {
                    const name = nanoid(5)
                    let tabs = ""
                    let checked = "checked=\"checked\""

                    for (
                        let i = idx + 1;
                        !(
                            tokens[i].nesting === -1
                            && tokens[i].type === "container_code-group_close"
                        );
                        ++i
                    ) {
                        if (tokens[i].type === "fence" && tokens[i].tag === "code") {
                            const title = extractTitle(tokens[i].info)
                            const id = nanoid(7)
                            tabs += `<input type="radio" name="group-${name}" id="tab-${id}" ${checked}><label for="tab-${id}">${title}</label>`

                            if (checked) {
                                tokens[i].info += " active"
                                checked = ""
                            }
                        }
                    }

                    return `<div class="vp-code-group"><div class="tabs">${tabs}</div><div class="blocks">\n`
                }
                return "</div></div>\n"
            },
        },
    ]
}

export function extractTitle(info: string) {
    return info.match(/\[(.*)\]/)?.[1] || extractLang(info) || "txt"
}
