<script lang="ts" setup>
const show = ref(false)
const toggleShow = useToggle(show)
const { t } = useI18n()
const { nav } = useConfig()
</script>

<template>
  <div md:hidden>
    <button class="i-carbon-menu" @click="toggleShow()" />
    <div
      v-show="show"
      class="hamburger fixed top-74px left-0 right-0 overflow-auto h-screen w-full bg-zinc-800 p-4"
    >
      <nav>
        <RouterLink
          v-for="item in nav" :key="item.text" :to="item.link" :title="t(item.text)" block b-b-1 b-b-zinc600 max-w-18rem
          mx-auto py-3
        >
          <span v-t="item.text" />
        </RouterLink>
      </nav>
    </div>
  </div>
</template>
