import { isClient } from "@vueuse/core"

// modified from https://css-tricks.com/how-to-animate-the-details-element/
export function setupDetailsAnimation() {
  if (isClient) {
    const allDetails = document.querySelectorAll(".details.custom-block") satisfies NodeListOf<HTMLDetailsElement>
    allDetails.forEach((el) => {
      const summary = el.querySelector("summary")
      const content = el.querySelector(".content") as HTMLElement
      const closeHeight = ref(0)
      const animation = ref<Animation>()
      const isClosing = ref(false)
      const isExpanding = ref(false)

      summary?.addEventListener("click", (e) => { onClick(e, el) })

      function onClick(e :Event, el:HTMLDetailsElement) {
        e.preventDefault()

        el.style.overflow = "hidden"
        if (isClosing.value || !el.open) {
          open()
        } else if (isExpanding.value || el.open) {
          shrink()
        }
      }

      function shrink() {
        // Set the element as "being closed"
        isClosing.value = true

        // Store the current height of the element
        const startHeight = `${el.offsetHeight}px`
        // Calculate the height of the summary
        const endHeight = `${closeHeight.value}px`

        animation.value?.cancel()

        // Start a WAAPI animation
        animation.value = el.animate({
          // Set the keyframes from the startHeight to endHeight
          height: [startHeight, endHeight],
        }, {
          duration: 400,
          easing: "ease-out",
        })

        // When the animation is complete, call onAnimationFinish()
        animation.value.onfinish = () => { onAnimationFinish(false) }
        // If the animation is cancelled, isClosing variable is set to false
        animation.value.oncancel = () => isClosing.value = false
      }

      function open() {
        // Apply a fixed height on the element
        el.style.height = `${el.offsetHeight}px`
        closeHeight.value = el.offsetHeight
        // Force the [open] attribute on the details element
        el.open = true
        // Wait for the next frame to call the expand function
        window.requestAnimationFrame(() => { expand() })
      }

      function expand() {
        // Set the element as "being expanding"
        isExpanding.value = true
        // Get the current fixed height of the element
        const startHeight = `${el.offsetHeight}px`
        // Calculate the open height of the element (content height + details offset height)
        const endHeight = `${(content?.offsetHeight ?? 0) + el.offsetHeight}px`
        console.log({ startHeight, endHeight })

        // If there is already an animation running
        // Cancel the current animation
        animation.value?.cancel()

        // Start a WAAPI animation
        animation.value = el.animate({
          // Set the keyframes from the startHeight to endHeight
          height: [startHeight, endHeight],
        }, {
          duration: 400,
          easing: "ease-in-out",
        })
        // When the animation is complete, call onAnimationFinish()
        animation.value.onfinish = () => { onAnimationFinish(true) }
        // If the.valueanimation is cancelled, isExpanding variable is set to false
        animation.value.oncancel = () => isExpanding.value = false
      }

      function onAnimationFinish(open: boolean) {
        // Set the open attribute based on the parameter
        el.open = open
        // Clear the stored animation
        animation.value = undefined
        // Reset isClosing & isExpanding
        isClosing.value = false
        isExpanding.value = false
        // Remove the overflow hidden and the fixed height
        el.style.height = el.style.overflow = ""
      }
    })
  }

}


