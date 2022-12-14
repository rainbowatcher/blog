const pageHeaderHight = useCssVar("--sika-page-header-height")
const postHeaderHight = useCssVar("--sika-post-header-height")

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
