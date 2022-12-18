import type { MaybeRef } from "@vueuse/core"
import { isClient } from "@vueuse/core"

export const computedBody = computed(() => {
  if (isClient) {
    return document.body
  } else {
    return null
  }
})

// export const useRect = (el: MaybeRef<Element | undefined>) => {
//   const defaultRect: DOMRect = {
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 0,
//     width: 0,
//     x: 0,
//     y: 0,
//     toJSON: () => {},
//   }
//   return computed(() => {
//     return unref(el) ? unref(el)!.getBoundingClientRect() : defaultRect
//   })
// }

export const useRect = (el: MaybeRef<Element | null | undefined>) => {
  const top = ref(0)
  const bottom = ref(0)
  const left = ref(0)
  const right = ref(0)
  const height = ref(0)
  const width = ref(0)

  onMounted(() => {
    const { top: _top, bottom: _bottom, left: _left, right: _right, height: _height, width: _width } = unref(el)!.getBoundingClientRect()
    top.value = _top
    bottom.value = _bottom
    left.value = _left
    right.value = _right
    height.value = _height
    width.value = _width
  })

  return {
    top, bottom, left, right, height, width,
  }
}
