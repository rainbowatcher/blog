import type { UserModule } from "~/types"

const title = "Rainbow Watcher"
const description = "Rainbow Watcher's Portfolio"
const domain = "blog-v2-theta.vercel.app"
const url = `https://${domain}/`
const image = "/favicon.svg"

const globalHead = {
    title,
    meta: [
    // facebook
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        // twitter / x
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
        { property: "twitter:url", content: url },
        { property: "twitter:domain", content: domain },

        { name: "description", content: description },
        {
            name: "theme-color",
            media: "(prefers-color-scheme: light)",
            content: "#ffffff",
        },
        {
            name: "theme-color",
            media: "(prefers-color-scheme: dark)",
            content: "#00aba9",
        },
    ],
    link: [
        {
            rel: "icon",
            type: "image/svg+xml",
            media: "(prefers-color-scheme: dark)",
            href: "/favicon-dark.svg",
        },
        {
            rel: "icon",
            type: "image/svg+xml",
            media: "(prefers-color-scheme: light)",
            href: "/favicon.svg",
        },
        {
            rel: "license",
            href: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
        },
    ],
}

export const install: UserModule = ({ app, router, isClient, head }) => {
    head?.push(globalHead)
}
