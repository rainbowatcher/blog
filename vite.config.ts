import { resolve } from "node:path"
import { defineConfig } from "vitest/config"
// Vite plugins
import Vue from "@vitejs/plugin-vue"
import Pages from "vite-plugin-pages"
import generateSitemap from "vite-ssg-sitemap"
import Components from "unplugin-vue-components/vite"
import AutoImport from "unplugin-auto-import/vite"
import Markdown from "vite-plugin-vue-markdown"
import VueI18n from "@intlify/unplugin-vue-i18n/vite"
import Inspect from "vite-plugin-inspect"
// Other
import Unocss from "unocss/vite"
import autoprefixer from "autoprefixer"
import {
  dynamicRoute,
  elevateStyle,
  extendRouteMeta,
  markdownEnhance,
  resolveHiddenPost,
} from "./src/plugins"
import { highlight } from "./src/plugins/markdown"



export default defineConfig({
  resolve: {
    alias: {
      "~/": `${resolve(__dirname, "src")}/`,
    },
  },
  define: {
    "import.meta.vitest": undefined,
  },
  publicDir: "src/public",
  plugins: [

    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ["vue", "md"],
      dirs: "pages",
      extendRoute(route) {
        extendRouteMeta(route)
      },
      onRoutesGenerated(routes) {
        resolveHiddenPost(routes)
      },
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "vue-i18n",
        "vue/macros",
        "@vueuse/head",
        "@vueuse/core",
      ],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables", "src/store"],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/components.d.ts",
      dirs: ["src/components", "src/layouts"],
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // https://github.com/antfu/vite-plugin-vue-markdown
    // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
    Markdown({
      // frontmatterPreprocess(_frontmatter, _options) {
      //   const head = {}
      //   console.log(_frontmatter)
      //   return {
      //     head,
      //     frontmatter: _frontmatter,
      //   }
      // },
      wrapperComponent: "post",
      headEnabled: true,
      markdownItOptions: {
        highlight: await highlight("one-dark-pro"),
      },
      markdownItSetup: markdownEnhance,
      transforms: {
        before: (code, _id) => {
          //  code for markdown raw content
          //  id for file abs path
          return code
        },
      },
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve(__dirname, "src/locales/**")],
    }),

    // https://github.com/antfu/vite-plugin-inspect
    // Visit http://localhost:3333/__inspect/ to see the inspector
    Inspect(),
  ],

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    crittersOptions: {
      preload: "swap",
      logLevel: "error",
    },
    dirStyle: "nested",
    script: "async defer",
    formatting: "minify",
    onBeforePageRender(_route, indexHTML) {
      indexHTML = elevateStyle(indexHTML)
      return indexHTML
    },
    includedRoutes: dynamicRoute,
    onFinished() {
      generateSitemap()
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  ssr: {
    // TODO: workaround until they support native ESM
    noExternal: ["workbox-window", /vue-i18n/],
  },
  test: {
    includeSource: ["src/**/*.ts"],
  },
})
