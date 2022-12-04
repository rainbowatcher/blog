import { resolve } from "node:path"
import fs from "node:fs"
import matter from "gray-matter"
import { defineConfig } from "vite"
import Preview from "vite-plugin-vue-component-preview"
import Vue from "@vitejs/plugin-vue"
import Pages from "vite-plugin-pages"
import generateSitemap from "vite-ssg-sitemap"
import Components from "unplugin-vue-components/vite"
import AutoImport from "unplugin-auto-import/vite"
import Markdown from "vite-plugin-vue-markdown"
// import { VitePWA } from "vite-plugin-pwa"
import VueI18n from "@intlify/vite-plugin-vue-i18n"
import Inspect from "vite-plugin-inspect"
import LinkAttributes from "markdown-it-link-attributes"
import Unocss from "unocss/vite"
import anchor from "markdown-it-anchor"
import emoji from "markdown-it-emoji"
import footnote from "markdown-it-footnote"
import mark from "markdown-it-mark"
// import Shiki from "markdown-it-shiki"

import {
  containerPlugin,
  highlight,
  highlightLineAttr,
  imagePlugin,
  katexPlugin,
  lineNumberPlugin,
  preWrapperPlugin,
} from "./src/plugins/markdown"
import { slugify } from "./src/utils"

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${resolve(__dirname, "src")}/`,
    },
  },
  publicDir: "src/public",

  plugins: [
    Preview(),

    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ["vue", "md"],
      dirs: "pages",
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))
        const md = fs.readFileSync(path, "utf-8")
        const { data, excerpt } = matter(md, {
          excerpt_separator: "<!-- more -->",
        })
        const frontmatter = { frontmatter: Object.assign(data, { excerpt }) }
        route.meta = Object.assign(route.meta || {}, frontmatter)
        return route
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
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // https://github.com/antfu/vite-plugin-vue-markdown
    // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
    Markdown({
      wrapperComponent: "post",
      wrapperClasses: "md-doc m-auto max-w-2/3",
      headEnabled: true,
      markdownItOptions: {
        highlight: await highlight({
          light: "vitesse-light",
          dark: "one-dark-pro",
        }),
      },
      markdownItUses: [
        highlightLineAttr,
        imagePlugin,
        preWrapperPlugin,
        emoji,
        footnote,
        mark,
        lineNumberPlugin,
        katexPlugin,
      ],
      async markdownItSetup(md) {
        // https://prismjs.com/
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: "_blank",
            rel: "noopener noreferrer",
          },
        })
          // .use(Shiki, {
          //   light: "vitesse-light",
          //   dark: "one-dark-pro",
          // })
          .use(containerPlugin)
          // related: antfu/antfu.me
          .use(anchor, {
            level: 1,
            slugify,
            permalink: anchor.permalink.linkInsideHeader({
              symbol: "#",
              renderAttrs: () => ({ "aria-hidden": "true" }),
              placement: "before",
            }),
          })
          // .use(highlightLines)
          // .use(imagePlugin)
          // .use(lineNumberPlugin)
          // .use(katexPlugin)
      },
      transforms: {
        before: (code, _id) => {
          //  code for markdown raw content
          //  id for file abs path

          return code
        },
      },
    }),

    // https://github.com/antfu/vite-plugin-pwa
    // VitePWA({
    //   registerType: "autoUpdate",
    //   includeAssets: ["favicon.svg", "safari-pinned-tab.svg"],
    //   manifest: {
    //     name: "Vitesse",
    //     short_name: "Vitesse",
    //     theme_color: "#ffffff",
    //     icons: [
    //       {
    //         src: "/pwa-192x192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/pwa-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/pwa-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //         purpose: "any maskable",
    //       },
    //     ],
    //   },
    // }),

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
    // crittersOptions
    dirStyle: "nested",
    script: "async",
    formatting: "minify",
    // onBeforePageRender: (route, indexHtml, ctx) => {
    //   return `<h1>Hello</h1>`
    // },
    onFinished() {
      generateSitemap()
    },
  },

  ssr: {
    // TODO: workaround until they support native ESM
    noExternal: ["workbox-window", /vue-i18n/],
  },
})
