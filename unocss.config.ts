import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss"

export default defineConfig({
  theme: {
    height: {
      header: "var(--sika-page-header-height)",
    },
    spacing: {
      "ph-hide": "calc(0px - var(--sika-page-header-height))",
      "under-header": "var(--sika-page-header-height)",
    },
  },
  shortcuts: [
    ["btn", "px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50"],
    ["icon-btn", "m-auto inline-block cursor-pointer select-none opacity-75 duration-100 ease-in-out hover:opacity-100 hover:text-teal-600"],
    ["site-nav", "inline-flex items-center"],
    ["flex-center", "justify-center items-center"],
    ["menu-item", "cursor-pointer"],
    ["bg-center-cover", "bg-(center no-repeat cover)"],
    ["under-page-header", "top-[var(--sika-page-header-height)]"],
    ["under-post-header", "top-[var(--sika-post-header-height)]"],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.5,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerCompileClass(),
  ],
  // safelist: "prose m-auto text-left max-w-2/3".split(" "),
})
