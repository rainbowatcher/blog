<script lang="ts" setup>
import { flip, offset, shift, useFloating } from "@floating-ui/vue"
const triggerText = "Google"
const trigger = ref<HTMLElement>()
const content = ref<HTMLElement>()
const show = ref(false)
const toggleShow = useToggle(show)
const { top, bottom, left, right, height, width } = useRect(trigger)
const { x, y, strategy } = useFloating(trigger, content, {
  placement: "left",
  middleware: [offset(10)],
})

const tri = () => {
  toggleShow()
  console.log(x.value, y.value, strategy.value)
  console.log(top.value, bottom.value, left.value, right.value, height.value, width.value)
}
</script>

<template>
  <div class="dropdown">
    <div ref="trigger" class="trigger" @click="tri()">
      {{ triggerText }}
    </div>
    <div
      v-show="show" ref="content" class="content absolute border-(1 solid black)"
      :style="{
        position: strategy,
        top: `${y ?? 0}px`,
        left: `${x ?? 0}px`,
        width: 'max-content',
      }"
    >
      <ul divide="zinc500/30 y">
        <li>{{ "option1" }}</li>
        <li>{{ "option2" }}</li>
        <li>{{ "option3" }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.dropdown
  @apply b-(sky-600 1) rounded-l

.trigger
  z-index: 2

.content li
  padding: 12px
</style>
