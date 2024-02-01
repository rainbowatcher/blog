import type { SiteConfig } from "../types"

export const isDark = useDark()
export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()

// TODO: move dynamic head value to root component
export function useConfig(): SiteConfig {
    return {
        nav: [
            {
                text: "button.home",
                link: "/",
            },
            {
                text: "button.archives",
                link: "/archives",
            },
            {
                text: "button.tags",
                link: "/tags",
            },
            // {
            //   text: "button.note",
            //   link: "/note",
            // },
            {
                text: "button.about",
                link: "/about",
            },
        ],
    }
}
