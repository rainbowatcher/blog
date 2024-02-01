<script lang="ts" setup>
defineProps<{
  inContent?: boolean
}>()
const { t } = useI18n()
const { nav } = useConfig()
</script>

<template>
    <nav class="page-nav-menu" :class="{ 'nav-in-content': inContent }" lt-md:mb-8>
        <RouterLink
            v-for="item in nav" :key="item.link" :to="item.link" :title="t(item.text)"
            class="lt-md-(mx-auto block max-w-18rem b-b-1 b-b-zinc500/30 py-3)"
        >
            <span v-t="item.text" />
        </RouterLink>
    </nav>
</template>

<style lang="scss">
.nav-in-content {
  @apply hidden gap-x-4 items-center md-flex;

  a:hover {
    @apply c-neutral3;
  }
}

.menu-item {
  @apply cursor-pointer break-all;
}
</style>
