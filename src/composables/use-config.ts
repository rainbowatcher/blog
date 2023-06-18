import type { SiteConfig } from "../types"

export const isDark = useDark()
export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()

export function useConfig(): SiteConfig {
  return {
    head: {
      title: "Blog",
      meta: [
        { name: "description", content: "Opinionated Vite Starter Template" },
        {
          name: "theme-color",
          content: computed(() => isDark.value ? "#00aba9" : "#ffffff"),
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: computed(() => preferredDark.value ? "/favicon-dark.svg" : "/favicon.svg"),
        },
      ],
    },
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
