/**
 * Converts a url path to the corresponding js chunk filename.
 */
export function pathToFile(path: string): string {
    let pagePath = path.replace(/\.html$/, "")
    pagePath = decodeURIComponent(pagePath)
    // pagePath = pagePath.replace(/\/$/, "/index") // /foo/ -> /foo/index
    return pagePath
}

// https://github.com/rollup/rollup/blob/main/src/utils/sanitizeFileName.ts
// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g
const DRIVE_LETTER_REGEX = /^[a-z]:/i

/**
 * Sanitizes a file name by replacing invalid characters with underscores.
 *
 * @param {string} name - The original file name.
 * @return {string} The sanitized file name.
 */
export function sanitizeFileName(name: string): string {
    const match = DRIVE_LETTER_REGEX.exec(name)
    const driveLetter = match ? match[0] : ""

    // A `:` is only allowed as part of a windows drive letter (ex: C:\foo)
    // Otherwise, avoid them because they can refer to NTFS alternate data streams.
    return driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "_")
}
