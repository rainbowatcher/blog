export * from "./re"
export * from "./device"
export * from "./slugify"
export * from "./file"

export function throttleAndDebounce(fn: () => void, delay: number): () => void {
  let timeoutId: NodeJS.Timeout
  let isCalled = false

  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    if (!isCalled) {
      fn()
      isCalled = true
      setTimeout(() => {
        isCalled = false
      }, delay)
    } else {
      timeoutId = setTimeout(fn, delay)
    }
  }
}
