import type { MaybeComputedRef, MaybeElementRef } from "@vueuse/core"
import { isClient } from "@vueuse/core"
import type { LengthUnit } from "~/types/position"
import { Length } from "~/types/position"

export const pageHeaderHight = useCssVar("--sika-h-page-header")
export const postHeaderHight = useCssVar("--sika-h-post-header")

/**
 * hook that handles the positioning of an aside element
 */
export function useAsidePos() {
  const asideClass = ref("is-abs")

  const pos = computed(() => {
    return usePx(postHeaderHight).value - usePx(pageHeaderHight).value
  })

  const onScroll = () => {
    if (window.scrollY >= pos.value) {
      asideClass.value = "is-fixed"
    } else {
      asideClass.value = "is-abs"
    }
  }

  onMounted(() => {
    onScroll()
  })

  const canceler = useEventListener("scroll", onScroll)

  return {
    asideClass,
    canceler,
  }
}

export function usePx(length: MaybeComputedRef<string>, element?: MaybeElementRef<HTMLElement>, initialValue = 0) {
  const px = ref(initialValue)
  const elementRef = computed(() => unrefElement(element) ?? computedBody.value)

  if (elementRef && length) {
    const fontSize = useFontSize(unrefElement(elementRef) as HTMLElement | undefined)
    let unit: LengthUnit = "px"
    let size = -1

    try {
      const len = Length.valueOf(resolveUnref(length)) as Length
      unit = len.unit
      size = len.size
    } catch (e) {
      console.log(e)
    }

    if (unit === "px") {
      px.value = size
    } else {
      px.value = Number(fontSize) * size
    }
  }

  return px
}

/**
 * Custom hook that retrieves the font size of a given element or returns a default value.
 *
 * @param maybeElRef Optional reference to the element whose font size is to be retrieved.
 * @param defaultSize The default font size to be returned if no element is provided or if running on the server-side.
 * @returns The font size of the element, if available and running on the client-side; otherwise, it returns the default font size.
 */
export function useFontSize(maybeElRef?: MaybeElementRef<HTMLElement | undefined>, defaultSize = 16) {
  const el = unrefElement(maybeElRef)
  if (isClient && el) {
    const fontSize = window.getComputedStyle(el).getPropertyValue("font-size")
    return parseInt(fontSize, 10)
  }

  return defaultSize
}
