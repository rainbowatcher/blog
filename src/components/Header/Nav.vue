<script lang="ts" setup>
const { t, availableLocales, locale } = useI18n()
const { nav } = useConfig()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  // window.refresh
}
</script>

<template>
  <nav text-base nav-item lt-md:display-none bg="backdrop-filter">
    <RouterLink v-for="item in nav" :key="item.link" class="icon-btn mx-2" :to="item.link" :title="t(item.text)">
      <p v-t="item.text" />
    </RouterLink>
    <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon" />
    </button>
    <a class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales()">
      <div i-carbon-ibm-watson-language-translator />
    </a>
    <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank" title="GitHub">
      <div i-carbon-logo-github />
    </a>
  </nav>
</template>
