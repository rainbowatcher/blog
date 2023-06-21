import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss"

export default defineConfig({
  shortcuts: [
    ["btn", "inline-block cursor-pointer"],
    ["icon-btn", "m-auto inline-block cursor-pointer select-none opacity-75 duration-100 ease-in-out hover:opacity-100 hover:text-teal-600"],
    ["site-nav", "inline-flex items-baseline"],
    ["flex-center", "flex justify-center items-center"],
    ["menu-item", "cursor-pointer"],
    ["bg-center-cover", "bg-(center no-repeat cover)"],
    ["under-page-nav", "top-[var(--sika-h-page-nav)]"],
    ["under-post-header", "top-[var(--sika-h-post-header)]"],
  ],
  presets: [
    presetUno(),
    // <div h2>
    presetAttributify(),
    // <i carbon-sun>
    presetIcons({
      scale: 1.5,
      warn: true,
    }),
    // presetTypography(),
    // presetWebFonts(),
  ],
  transformers: [
    // @apply / @screen / theme()
    transformerDirectives(),
    // hover:(bg-gray-400 font-medium)
    transformerVariantGroup(),
  ],
  // safelist: "prose m-auto text-left max-w-2/3".split(" "),
})
