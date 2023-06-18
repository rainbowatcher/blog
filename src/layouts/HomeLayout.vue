<script lang="ts" setup>
import { randomColor } from "~/utils/color"

const randomColors = Array.from({ length: 5 }, _ => randomColor("rgba"))
</script>

<template>
  <PageNav />
  <div
    class="home-page-header" :style="{
      '--sika-c-home-header-0': randomColors[0],
      '--sika-c-home-header-1': randomColors[1],
      '--sika-c-home-header-2': randomColors[2],
      '--sika-c-home-header-3': randomColors[3],
      '--sika-c-home-header-4': randomColors[4],
    }"
  >
    <div class="ma h-full max-w-4xl flex-center">
      <div class="mt-8 h-8rem w-lg flex-center rounded-lg md-bg-neutral8/20">
        <span text-3.5rem font-bold>Welcome</span>
      </div>
    </div>
  </div>
  <main mt4>
    <slot />
  </main>
  <Footer />
</template>

<style lang="scss" scoped>
.home-page-header {
  /* font-family: 'Quicksand', sans-serif; */
  /* min-height: 100vh; */
  width: 100%;
  position: relative;
  margin: 0;
  background-color: rgb(56, 189, 248, .4);
  height: var(--sika-h-post-header);
  background-image:
    radial-gradient(closest-side, var(--sika-c-home-header-0), transparent),
    radial-gradient(closest-side, var(--sika-c-home-header-1), transparent),
    radial-gradient(closest-side, var(--sika-c-home-header-2), transparent),
    radial-gradient(closest-side, var(--sika-c-home-header-3), transparent),
    radial-gradient(closest-side, var(--sika-c-home-header-4), transparent);
  background-size:
    80vmax 80vmax,
    130vmax 130vmax,
    90vmax 90vmax,
    110vmax 110vmax,
    120vmax 120vmax;
  background-position:
    -80vmax -80vmax,
    60vmax -30vmax,
    10vmax 10vmax,
    -30vmax -10vmax,
    50vmax 50vmax;
  background-repeat: no-repeat;
  animation: 10s movement linear infinite;

  // &::after {
  //   content: '';
  //   display: block;
  //   position: absolute;
  //   height: var(--sika-h-post-header);
  //   width: 100%;
  //   height: 100%;
  //   top: 0;
  //   left: 0;
  //   backdrop-filter: blur(4px);
  //   -webkit-backdrop-filter: blur(4px);
  // }

  // >span {
  //   position: relative;
  //   z-index: 1;
  //   display: flex;
  //   min-height: 100%;
  //   width: 100%;
  //   justify-content: center;
  //   align-items: center;
  //   font-size: 5rem;
  //   color: transparent;
  //   text-shadow:
  //     0px 0px 1px rgba(255, 255, 255, 1),
  //     0px 4px 4px rgba(0, 0, 0, .15);
  //   letter-spacing: .2rem;
  // }
}

@keyframes movement {

  0%,
  100% {
    background-size:
      130vmax 130vmax,
      80vmax 80vmax,
      90vmax 90vmax,
      110vmax 110vmax,
      90vmax 90vmax;
    background-position:
      -80vmax -80vmax,
      60vmax -30vmax,
      10vmax 10vmax,
      -30vmax -10vmax,
      50vmax 50vmax;
  }

  25% {
    background-size:
      100vmax 100vmax,
      90vmax 90vmax,
      100vmax 100vmax,
      90vmax 90vmax,
      60vmax 60vmax;
    background-position:
      -60vmax -90vmax,
      50vmax -40vmax,
      0vmax -20vmax,
      -40vmax -20vmax,
      40vmax 60vmax;
  }

  50% {
    background-size:
      80vmax 80vmax,
      110vmax 110vmax,
      80vmax 80vmax,
      60vmax 60vmax,
      80vmax 80vmax;
    background-position:
      -50vmax -70vmax,
      40vmax -30vmax,
      10vmax 0vmax,
      20vmax 10vmax,
      30vmax 70vmax;
  }

  75% {
    background-size:
      90vmax 90vmax,
      90vmax 90vmax,
      100vmax 100vmax,
      90vmax 90vmax,
      70vmax 70vmax;
    background-position:
      -50vmax -40vmax,
      50vmax -30vmax,
      20vmax 0vmax,
      -10vmax 10vmax,
      40vmax 60vmax;
  }
}
</style>
