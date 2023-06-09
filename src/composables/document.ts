import type { MaybeRef } from "@vueuse/core"
import { isClient } from "@vueuse/core"

export const computedBody = computed(() => {
  if (isClient) {
    return document.body
  } else {
    return null
  }
})

