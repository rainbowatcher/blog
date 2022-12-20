import type { MaybeComputedRef, MaybeElementRef } from "@vueuse/core"
import { isClient } from "@vueuse/core"
import type { LengthUnit } from "~/types/position"
import { Length } from "~/types/position"

export const pageHeaderHight = useCssVar("--sika-h-page-header")
export const postHeaderHight = useCssVar("--sika-h-post-header")

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
    const fontSize = useFontSize(unrefElement(elementRef))
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

export function useFontSize(el?: MaybeElementRef<HTMLElement | null>, defaultSize = 16) {
  let fontSize: number = defaultSize
  if (isClient && unrefElement(el)) {
    fontSize = Number.parseInt(window.getComputedStyle(unrefElement(el)!).getPropertyValue("font-size"))
  }
  return fontSize
}
