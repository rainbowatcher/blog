// ref: https://github.com/Renovamen/vuepress-theme-gungnir/blob/main/packages/plugins/katex/src/node/markdown-it-katex.ts
import katex from "katex"
import type { KatexOptions } from "katex"
import type MarkdownIt from "markdown-it"
import type StateBlock from "markdown-it/lib/rules_block/state_block"
import type StateInline from "markdown-it/lib/rules_inline/state_inline"
import type Token from "markdown-it/lib/token"
import { escapeHtml } from "markdown-it/lib/common/utils"

function isValidDelim(state: StateInline, pos: number): { canOpen: boolean, canClose: boolean } {
    const prevChar = pos > 0 ? state.src.charCodeAt(pos - 1) : -1
    const nextChar = pos + 1 <= state.posMax ? state.src.charCodeAt(pos + 1) : -1

    let canOpen = true
    let canClost = true

    /*
   * Check non-whitespace conditions for opening and closing, and
   * check that closing delimeter isn't followed by a number
   */
    if (
        prevChar === 0x20
        || /* " " */ prevChar === 0x09
        || /* \t */ (nextChar >= 0x30 /* "0" */ && nextChar <= 0x39) /* "9" */
    )
        canClost = false

    if (nextChar === 0x20 /* " " */ || nextChar === 0x09 /* \t */)
        canOpen = false

    return {
        canOpen,
        canClose: canClost,
    }
}

function mathInline(state: StateInline, silent?: boolean): boolean {
    let match, token, res, pos

    if (state.src[state.pos] !== "$")
        return false

    res = isValidDelim(state, state.pos)
    if (!res.canOpen) {
        if (!silent)
            state.pending += "$"

        state.pos += 1
        return true
    }

    /*
   * First check for and bypass all properly escaped delimiters
   * This loop will assume that the first leading backtick can not
   * be the first character in state.src, which is known since
   * we have found an opening delimiter already.
   */
    const start = state.pos + 1

    match = start
    while (state.src.includes("$", match)) {
    // eslint: no condition assign in while statement
        match = state.src.indexOf("$", match)
        // Found potential $, look for escapes, pos will point to
        // first non escape when complete
        pos = match - 1
        while (state.src[pos] === "\\") pos -= 1

        // Even number of escapes, potential closing delimiter found
        if ((match - pos) % 2 === 1)
            break

        match += 1
    }

    // No closing delimiter found.  Consume $ and continue.
    if (match === -1) {
        if (!silent)
            state.pending += "$"

        state.pos = start
        return true
    }

    // Check if we have empty content, ie: $$.  Do not parse.
    if (match - start === 0) {
        if (!silent)
            state.pending += "$$"

        state.pos = start + 1
        return true
    }

    // Check for valid closing delimiter
    res = isValidDelim(state, match)

    if (!res.canClose) {
        if (!silent)
            state.pending += "$"

        state.pos = start
        return true
    }

    if (!silent) {
        token = state.push("mathInline", "math", 0)
        token.markup = "$"
        token.content = state.src.slice(start, match)
    }

    state.pos = match + 1

    return true
}

function mathBlock(state: StateBlock, start: number, end: number, silent: boolean): boolean {
    let firstLine
    let lastLine
    let next
    let lastPos
    let found = false
    let pos = state.bMarks[start] + state.tShift[start]
    let max = state.eMarks[start]

    if (pos + 2 > max)
        return false
    if (state.src.slice(pos, pos + 2) !== "$$")
        return false

    pos += 2
    firstLine = state.src.slice(pos, max)

    if (silent)
        return true

    if (firstLine.trim().endsWith("$$")) {
    // Single line expression
        firstLine = firstLine.trim().slice(0, -2)
        found = true
    }

    for (next = start; !found;) {
        next += 1

        if (next >= end)
            break

        pos = state.bMarks[next] + state.tShift[next]
        max = state.eMarks[next]

        if (pos < max && state.tShift[next] < state.blkIndent)
        // non-empty line with negative indent should stop the list:
            break

        if (state.src.slice(pos, max).trim().endsWith("$$")) {
            lastPos = state.src.slice(0, max).lastIndexOf("$$")
            lastLine = state.src.slice(pos, lastPos)
            found = true
        }
    }

    state.line = next + 1

    const token = state.push("mathBlock", "math", 0)

    token.block = true
    token.content
    = (firstLine?.trim() ? `${firstLine}\n` : "")
    + state.getLines(start + 1, next, state.tShift[start], true)
    + (lastLine?.trim() ? lastLine : "")
    token.map = [start, state.line]
    token.markup = "$$"

    return true
}

const katexPlugin: MarkdownIt.PluginWithOptions<KatexOptions> = (md: MarkdownIt, options: KatexOptions = { throwOnError: false }): void => {
    const katexOptions: KatexOptions = { ...options, output: "html" }

    // set KaTeX as the renderer for markdown-it-simplemath
    const katexInline = (tex: string): string => {
        katexOptions.displayMode = false

        try {
            return katex.renderToString(tex, katexOptions)
        }
        catch (error) {
            if (katexOptions.throwOnError)
                console.warn(error)

            return `<span title='${escapeHtml(
                (error as Error).toString(),
            )}'>${escapeHtml(tex)}</span>`
        }
    }

    const katexBlock = (tex: string): string => {
        katexOptions.displayMode = true

        try {
            return `<p>${katex.renderToString(tex, katexOptions)}</p>`
        }
        catch (error) {
            if (katexOptions.throwOnError)
                console.warn(error)

            return `<p class='katex-error' title='${escapeHtml(
                (error as Error).toString(),
            )}'>${escapeHtml(tex)}</p>`
        }
    }

    const inlineRenderer = (tokens: Token[], idx: number): string => {
        return katexInline(tokens[idx].content)
    }

    const blockRenderer = (tokens: Token[], idx: number): string => {
        return `${katexBlock(tokens[idx].content)}\n`
    }

    md.inline.ruler.after("escape", "mathInline", mathInline)
    // It’s a workaround here because types issue
    md.block.ruler.after("blockquote", "mathBlock", mathBlock, {
        alt: ["paragraph", "reference", "blockquote", "list"],
    })

    md.renderer.rules.mathInline = inlineRenderer
    md.renderer.rules.mathBlock = blockRenderer
}

export { katexPlugin }
