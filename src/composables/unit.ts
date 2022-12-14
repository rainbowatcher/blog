import type { MaybeComputedRef, MaybeElementRef } from "@vueuse/core"
import { isClient } from "@vueuse/core"
// import { resolveUnref } from "@vueuse/core"
// import type { ComputedRef } from "vue"

type LengthUnit = "px" | "rem" | "em"
const lengthRE = /^\s*([+-]?[\d\.]*)\s*(.*)\s*$/i

export const usePx = (length: MaybeComputedRef<string>, element?: MaybeElementRef, initialValue = 0) => {
  const px = ref(initialValue)
  const elementRef = computed(() => unrefElement(element) ?? document?.documentElement)

  if (elementRef && length) {
    const fontSize = getFontSize(unrefElement(elementRef))
    const { unit, val, valid } = calc(resolveUnref(length))
    if (!valid)
      return px

    if (unit === "px") {
      px.value = val
    } else {
      px.value = Number(fontSize) * val
    }
  }

  function calc(_length: string) {
    const match = lengthRE.exec(_length)
    if (match != null && match.length > 2) {
      const size = match[1]
      const unit = match[2] as LengthUnit
      return {
        unit,
        val: size === "" ? 1 : Number(size),
        valid: !isNaN(Number(size)) && unit.length > 0,
      }
    }
    return { unit: "", val: 0, valid: false }
  }

  function getFontSize(el?: Element, defaultSize = 16) {
    let fontSize: number = defaultSize
    if (isClient && el) {
      fontSize = Number.parseInt(window.getComputedStyle(el).getPropertyValue("font-size"))
    }
    return fontSize
  }
  return px
}
