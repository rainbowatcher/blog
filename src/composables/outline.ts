import { type Ref, onMounted, onUnmounted, onUpdated } from "vue"
import type { MenuItem } from "~/types"

const PAGE_OFFSET = 74

/**
 * get headers
 * @param levelRange header level range
 * @returns headers
 */
export function getHeaders(levelRange = 2) {
  const updatedHeaders: MenuItem[] = []
  document
    .querySelectorAll<HTMLHeadingElement>("h2, h3, h4, h5, h6")
    .forEach((el) => {
      if (el.textContent && el.id) {
        updatedHeaders.push({
          level: Number(el.tagName[1]),
          title: el.innerText.replace(/\s*#\s*/, ""),
          link: `#${el.id}`,
        })
      }
    })
  return resolveHeaders(updatedHeaders, levelRange)
}

export function resolveHeaders(
  headers: MenuItem[],
  levelsRange = 2,
) {
  const levels: [number, number]
    = typeof levelsRange === "number"
      ? [2, levelsRange]
      : levelsRange === "deep"
        ? [2, 6]
        : levelsRange

  return groupHeaders(headers, levels)
}

function groupHeaders(headers: MenuItem[], levelsRange: [number, number]) {
  const result: MenuItem[] = []

  headers = headers.map(h => ({ ...h }))
  headers.forEach((h, index) => {
    if (h.level >= levelsRange[0] && h.level <= levelsRange[1]) {
      if (addToParent(index, headers, levelsRange)) {
        result.push(h)
      }
    }
  })

  return result
}

function addToParent(
  currIndex: number,
  headers: MenuItem[],
  levelsRange: [number, number],
) {
  if (currIndex === 0) {
    return true
  }

  const currentHeader = headers[currIndex]
  for (let index = currIndex - 1; index >= 0; index--) {
    const header = headers[index]

    if (
      header.level < currentHeader.level
      && header.level >= levelsRange[0]
      && header.level <= levelsRange[1]
    ) {
      if (header.children == null)
        header.children = []
      header.children.push(currentHeader)
      return false
    }
  }

  return true
}

export function useActiveAnchor(
  container: Ref<HTMLElement>,
  marker: Ref<HTMLElement>,
) {
  const onScroll = useThrottleFn(setActiveLink, 200)

  let prevActiveLink: HTMLAnchorElement | null = null

  onMounted(() => {
    requestAnimationFrame(setActiveLink)
    window.addEventListener("scroll", onScroll)
  })

  onUpdated(() => {
    // sidebar update means a route change
    activateLink(location.hash)
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll)
  })

  function setActiveLink() {
    const links = [].slice.call(
      container.value?.querySelectorAll(".outline-link"),
    ) as HTMLAnchorElement[]

    const anchors = [].slice
      .call(document.querySelectorAll(".markdown-body .header-anchor"))
      .filter((anchor: HTMLAnchorElement) => {
        return links.some((link) => {
          return link.hash === anchor.hash && anchor.offsetParent !== null
        })
      }) as HTMLAnchorElement[]

    const scrollY = window.scrollY
    const innerHeight = window.innerHeight
    const offsetHeight = document.body.offsetHeight
    const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 10

    // page bottom - highlight last one
    if (anchors.length && isBottom) {
      activateLink(anchors[anchors.length - 1].hash)
      return
    }

    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i]
      const nextAnchor = anchors[i + 1]

      const [isActive, hash] = isAnchorActive(i, anchor, nextAnchor, 74)

      if (isActive) {
        activateLink(hash)
        return
      }
    }
  }

  function activateLink(hash: string | null) {
    if (prevActiveLink) {
      prevActiveLink.classList.remove("active")
    }

    if (hash !== null) {
      prevActiveLink = container.value.querySelector(
        `a[href="${decodeURIComponent(hash)}"]`,
      )
    }

    const activeLink = prevActiveLink

    if (activeLink) {
      activeLink.classList.add("active")
      marker.value.style.top = `${activeLink.offsetTop}px`
      marker.value.style.opacity = "1"
    } else {
      marker.value.style.top = "0"
      marker.value.style.opacity = "0"
    }
  }
}

function getAnchorTop(anchor: HTMLAnchorElement): number {
  return anchor.parentElement!.offsetTop - PAGE_OFFSET
}

function isAnchorActive(
  index: number,
  anchor: HTMLAnchorElement,
  nextAnchor: HTMLAnchorElement | undefined,
  top = 0,
): [boolean, string | null] {
  const scrollTop = window.scrollY

  if (index === 0 && scrollTop === top) {
    return [true, null]
  }

  if (scrollTop + top < getAnchorTop(anchor)) {
    return [false, null]
  }

  if (!nextAnchor || scrollTop + top <= getAnchorTop(nextAnchor)) {
    return [true, anchor.hash]
  }

  return [false, null]
}
