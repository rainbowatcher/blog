import Color from "color"
import type { InjectionKey } from "vue"
import type { TagInfo } from "~/types"

export const tagMapSymbol: InjectionKey<Map<string, TagInfo>> = Symbol.for("blogTags")

export function useTagMap() {
    const tagMap = inject(tagMapSymbol)

    if (!tagMap) {
        throw new Error("useTagMap() is called without provider.")
    }

    return tagMap
}

export function useTags() {
    const tagMap = useTagMap()

    const tags: TagInfo[] = []

    for (const tag of tagMap.keys()) {
        const info: TagInfo = { name: "", pages: [] }
        const end = Color("#34d399")

        info.name = tag
        info.pages = tagMap.get(tag)?.pages || []
        info.color = end.saturate((tagMap.get(tag)?.pages.length || 0) * 50).toString()

        tags.push(info)
    }

    tags.sort((prev: TagInfo, next: TagInfo) => {
        return next.pages.length - prev.pages.length
    })
    return tags
}
