<script lang="ts" setup>
defineProps<{
    inContent?: boolean
}>()
const { availableLocales, locale } = useI18n()
function toggleLocales() {
    const locales = availableLocales
    locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
    <div class="extra" flex="~ row nowrap gap4" justify-center :class="{ 'in-content': inContent }">
        <div class="preferences flex gap4">
            <div i="carbon-sun dark:carbon-moon" cursor-pointer hover-c-neutral3 title="Theme" @click="toggleDark()" />
            <div i-carbon-ibm-watson-language-translator cursor-pointer hover-c-neutral3 title="Language" @click="toggleLocales()" />
        </div>

        <div class="social-links flex">
            <a rel="noopener noreferrer" href="https://github.com/rainbowatcher/blog" target="_blank" title="GitHub" class="cursor-pointer !c-neutral7 !dark-c-white !hover-c-neutral3">
                <div i-carbon-logo-github />
            </a>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.in-content
  @apply hidden lg:flex items-center
</style>
