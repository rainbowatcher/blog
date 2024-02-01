/**
 * move link tag to head
 * note: must place `<!-- script-slot -->` in your html file
 * @param indexHTML html text
 */
export function elevateStyle(indexHTML: string) {
    const RE = /.*(<link rel="stylesheet".*?>).*/
    const match = RE.exec(indexHTML)
    if (match) {
        const stylesheetLinkTag = match[1].trim()
        indexHTML = indexHTML.replace(stylesheetLinkTag, "")
        indexHTML = indexHTML.replace(
            "<!-- script-slot -->",
            stylesheetLinkTag,
        )
    }
    return indexHTML
}
