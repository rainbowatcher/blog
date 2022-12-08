<script lang="ts" setup>
const { t, availableLocales, locale } = useI18n()
const { nav } = useConfig()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <nav text-base flex="~ row gap4">
    <div class="nav-links site-nav gap4 lt-md:hidden">
      <RouterLink v-for="item in nav" :key="item.link" :to="item.link" :title="t(item.text)">
        <span v-t="item.text" menu-item />
      </RouterLink>
    </div>

    <div class="preferences flex gap4 lt-lg:hidden">
      <button class="icon-btn" :title="t('button.toggle_dark')" @click="toggleDark()">
        <div i="carbon-sun dark:carbon-moon" />
      </button>
      <button class="icon-btn" :title="t('button.toggle_langs')" @click="toggleLocales()">
        <div i-carbon-ibm-watson-language-translator />
      </button>
    </div>

    <div class="social-links lt-lg:hidden">
      <a class="icon-btn" rel="noreferrer" href="https://github.com/rainbowatcher/blog" target="_blank" title="GitHub">
        <div i-carbon-logo-github />
      </a>
    </div>
    <Flyout />
    <Hamburger />
  </nav>
</template>
