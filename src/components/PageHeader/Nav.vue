<script lang="ts" setup>
const props = defineProps<{
  inContent?: boolean
}>()
const { t } = useI18n()
const { nav } = useConfig()
</script>

<template>
  <nav ma :class="{ 'in-content': inContent }" lt-md:mb-8>
    <RouterLink
      v-for="item in nav" :key="item.link" :to="item.link" :title="t(item.text)"
      class="lt-md:(block b-b-1 b-b-zinc500/30 max-w-18rem mx-auto py-3)"
    >
      <span v-t="item.text" menu-item break-keep />
    </RouterLink>
  </nav>
</template>

<style lang="sass" scoped>
.in-content
  @apply hidden md:flex gap-4 items-center
</style>
