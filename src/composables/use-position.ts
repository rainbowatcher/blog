import { isClient } from "@vueuse/core"
import { toPx } from "~/utils/unit"


/**
 * hook that handles the positioning of an aside element
*/
export function useAsidePos() {
    const pageHeaderHeight = useCssVar("--sika-h-page-nav")
    const postHeaderHeight = useCssVar("--sika-h-post-header")
    const asideClass = ref("is-abs")

    const pos = computed(() => toPx(postHeaderHeight.value) - toPx(pageHeaderHeight.value))

    const { y } = useScroll(globalThis.window, { onScroll })
    function onScroll() {
        if (y.value >= pos.value) {
            asideClass.value = "is-fixed"
        }
        else {
            asideClass.value = "is-abs"
        }
    }

    onMounted(() => {
        onScroll()
    })

    // const canceler = useEventListener("scroll", onScroll)

    return asideClass

}

/**
 * Custom hook that retrieves the font size of a given element or returns a default value.
 *
 * @param maybeElRef Optional reference to the element whose font size is to be retrieved.
 * @param defaultSize The default font size to be returned if no element is provided or if running on the server-side.
 * @returns The font size of the element, if available and running on the client-side; otherwise, it returns the default font size.
 */
export function useFontSize(defaultSize = 16) {
    return computed(() => {
        if (isClient) {
            const fontSize = getComputedStyle(window.document.body).getPropertyValue("font-size")
            return parseInt(fontSize, 10)
        }

        return defaultSize
    })
}
