<script setup lang='ts'>
const { frontmatter } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const content = ref<HTMLDivElement>()

onMounted(() => {
  const handleAnchors = (
    event: MouseEvent & { target: HTMLElement },
  ) => {
    const link = event.target.closest("a")

    if (
      !event.defaultPrevented
      && link
      && event.button === 0
      && link.target !== "_blank"
      && link.rel !== "external"
      && !link.download
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
    ) {
      const url = new URL(link.href)
      if (url.origin !== window.location.origin)
        return

      event.preventDefault()
      const { pathname, hash } = url
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, "", hash)
        useScrollIntoAnchor()
      } else {
        router.push({ path: pathname, hash })
      }
    }
  }

  useEventListener(window, "hashchange", useScrollIntoAnchor)
  useEventListener(content.value!, "click", handleAnchors, { passive: false })

  useScrollIntoAnchor()
  setTimeout(useScrollIntoAnchor, 500)
})
</script>

<template>
  <article ref="content" mt-8>
    <slot />
  </article>
</template>

<style>
.header-anchor {
  @apply display-hide
}
</style>
