import type { Router } from "vue-router"
import type { UserModule } from "~/types"

const offset = 80

// ref: https://github.com/vuejs/vitepress/blob/main/src/client/app/router.ts
function setSmoothScrollWhenClickAnchor(router: Router, isClient: boolean) {
    if (isClient) {
        window.addEventListener(
            "click",
            (e) => {
                // // temporary fix for docsearch action buttons
                // const button = (e.target as Element).closest("button")
                // if (button)
                //   return

                const link = (e.target as Element).closest("a")
                if (link && !link.download) {
                    const { origin, pathname, hash, search, target } = link
                    const currentUrl = window.location
                    const extMatch = pathname.match(/\.\w+$/)
                    // only intercept inbound links
                    if (
                        !e.ctrlKey
                        && !e.shiftKey
                        && !e.altKey
                        && !e.metaKey
                        && target !== "_blank"
                        && origin === currentUrl.origin
                        // don't intercept if non-html extension is present
                        && !(extMatch && extMatch[0] !== ".html")
                    ) {
                        e.preventDefault()
                        if (
                            pathname === currentUrl.pathname
                            && search === currentUrl.search
                        ) {
                            // scroll between hash anchors in the same page
                            if (hash) {
                                history.pushState(null, "", hash)
                                // still emit the event so we can listen to it in themes
                                window.dispatchEvent(new Event("hashchange"))
                                // use smooth scroll when clicking on header anchor links
                                scrollTo(link, hash, link.classList.contains("header-anchor") || link.classList.contains("outline-link"))
                            }
                        }
                        else {
                            void router.push(pathname)
                            // scrollTo(link, hash, true)
                        }
                    }
                }
            },
            { capture: true },
        )
    }
}

// function handleHashChange() {
//     if (isClient) {
//         window.addEventListener("hashchange", (e) => {
//             e.preventDefault()
//         })
//     }
// }

function scrollTo(el: HTMLElement, hash: string, smooth = false) {
    let target: HTMLElement | null = null

    try {
        target = el.classList.contains("header-anchor")
            ? el
            : document.querySelector(decodeURIComponent(hash))
    }
    catch (e) {
        console.warn(e)
    }

    if (target) {
        const targetPadding = Number.parseInt(
            window.getComputedStyle(target).paddingTop,
            10,
        )
        const targetTop
      = window.scrollY
      + target.getBoundingClientRect().top
      - offset
      + targetPadding
        window.scrollTo({
            left: 0,
            top: targetTop,
            behavior: smooth ? "smooth" : "auto",
        })
    }
}

// function setupHistoryPosition() {
//   if (isClient) {
//     if (window.history.state?.scroll?.top) {
//       setTimeout(() => { window.scrollTo({ top: window.history.state.scroll.top, behavior: "auto" }) }, 200)
//     } else {
//       window.scrollTo(0, 0)
//     }
//   }
// }

// scroll to history position
export function scrollBehavior(to: any, from: any, savedPosition: any) {
    if (savedPosition)
        return savedPosition
    else
        return { top: 0 }
}

export const install: UserModule = ({ router, isClient }) => {
    setSmoothScrollWhenClickAnchor(router, isClient)
    // handleHashChange()
    // setupHistoryPosition()
}
