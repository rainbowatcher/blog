<script lang="ts" setup>
const props = defineProps<{
  inContent?: boolean
}>()
const { t } = useI18n()
const { nav } = useConfig()
</script>

<template>
  <nav class="page-nav" :class="{ 'nav-in-content': inContent }" lt-md:mb-8>
    <RouterLink
      v-for="item in nav" :key="item.link" :to="item.link" :title="t(item.text)"
      class="lt-md:(block b-b-1 b-b-zinc500/30 max-w-18rem mx-auto py-3)"
    >
      <span v-t="item.text" />
    </RouterLink>
  </nav>
</template>

<style lang="sass">
.nav-in-content
  display: none
  column-gap: .8rem
  align-items: center

  @media (min-width: 768px)
    display: flex

  a
    padding-left: .1rem
    padding-right: .1rem
    border-radius: .2rem
    transition: background-color 250ms

    &:hover
      background-color: rgba(aliceblue, .5)

.menu-item
  cursor: pointer
  word-break: break-all
</style>
