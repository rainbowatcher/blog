// Modified from: https://github.com/vuejs/vitepress/blob/main/src/node/markdown/plugins/highlight.ts
import type { HtmlRendererOptions, IThemeRegistration, Lang } from "shiki"
import { getHighlighter } from "shiki"

/**
 * 2 steps:
 *
 * 1. convert attrs into line numbers:
 *    {4,7-13,16,23-27,40} -> [4,7,8,9,10,11,12,13,16,23,24,25,26,27,40]
 * 2. convert line numbers into line options:
 *    [{ line: number, classes: string[] }]
 */
function attrsToLines(attrs: string): HtmlRendererOptions["lineOptions"] {
  const result: number[] = []
  if (!attrs.trim())
    return []

  attrs
    .split(",")
    .map(v => v.split("-").map(v => parseInt(v, 10)))
    .forEach(([start, end]) => {
      if (start && end) {
        result.push(
          ...Array.from({ length: end - start + 1 }, (_, i) => start + i),
        )
      }
      else {
        result.push(start)
      }
    })
  return result.map(v => ({
    line: v,
    classes: ["highlighted"],
  }))
}

export async function highlight(
  theme: IThemeRegistration | { dark: IThemeRegistration; light: IThemeRegistration } = "material-palenight",
): Promise<(str: string, lang: string, attrs: string) => string> {
  const hasSingleTheme = typeof theme === "string" || "name" in theme
  const getThemeName = (themeValue: IThemeRegistration) =>
    typeof themeValue === "string" ? themeValue : themeValue.name

  const highlighter = await getHighlighter({
    themes: hasSingleTheme ? [theme] : [theme.dark, theme.light],
  })
  const preRE = /^<pre.*?>/
  const vueRE = /-vue$/

  return (str: string, lang: string, attrs: string) => {
    const loadedLangs = highlighter.getLoadedLanguages()
    if (!loadedLangs.includes(lang as Lang)) {
      lang = "text"
    }
    const vPre = vueRE.test(lang) ? "" : "v-pre"
    lang = lang.replace(vueRE, "").toLowerCase()

    const lineOptions = attrsToLines(attrs)

    if (hasSingleTheme) {
      return highlighter
        .codeToHtml(str, { lang, lineOptions, theme: getThemeName(theme) })
        .replace(preRE, `<pre ${vPre}>`)
    }

    const dark = highlighter
      .codeToHtml(str, { lang, lineOptions, theme: getThemeName(theme.dark) })
      .replace(preRE, `<pre ${vPre} class="code-dark">`)

    const light = highlighter
      .codeToHtml(str, { lang, lineOptions, theme: getThemeName(theme.light) })
      .replace(preRE, `<pre ${vPre} class="code-light">`)

    return dark + light
  }
}
