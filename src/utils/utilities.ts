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

export function randomInt(max = 10) {
  return Math.floor(Math.random() * max) + 1
}
