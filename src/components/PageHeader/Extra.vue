<script lang="ts" setup>
defineProps<{
  inContent?: boolean
}>()
const { t, availableLocales, locale } = useI18n()
const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <div class="extra" flex="~ row nowrap gap4" justify-center :class="{ 'in-content': inContent }">
    <div class="preferences flex gap4">
      <button class="icon-btn " :title="t('button.toggle_dark')" @click="toggleDark()">
        <div i="carbon-sun dark:carbon-moon" />
      </button>
      <button class="icon-btn" :title="t('button.toggle_langs')" @click="toggleLocales()">
        <div i-carbon-ibm-watson-language-translator />
      </button>
    </div>

    <div class="social-links flex">
      <a class="icon-btn" rel="noopener noreferrer" href="https://github.com/rainbowatcher/blog" target="_blank" title="GitHub">
        <div i-carbon-logo-github />
      </a>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.in-content
  @apply hidden lg:flex items-center
</style>
