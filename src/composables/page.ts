export const useScrollIntoAnchor = () => {
  if (location.hash) {
    const ele = document.querySelector(decodeURIComponent(location.hash))
    // @ts-expect-error-ts-2239
    const offset = ele?.offsetTop
    if (offset)
      window.scroll({ top: offset - 100, behavior: "smooth" })

    else ele?.scrollIntoView({ behavior: "smooth" })
  }
}
