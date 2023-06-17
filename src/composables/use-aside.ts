import { computed } from "vue"
import { useMediaQuery } from "@vueuse/core"
// import { useSidebar } from './sidebar'

export function useAside(container: Ref<HTMLElement>) {
  // const { hasSidebar } = useSidebar()
  // const is768 = useMediaQuery("(min-width: 768px)")
  const is1024 = useMediaQuery("(min-width: 1024px)")

  const isAsideEnabled = computed(() => {
    // if (!is1024.value && !is768.value) {
    //   return false
    // }
    if (!container.value) {
      return false
    }

    // return hasSidebar.value ? is1280.value : is960.value
    return is1024.value
  })

  return {
    isAsideEnabled,
  }
}
