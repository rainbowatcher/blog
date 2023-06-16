import { resolve } from "node:path"
import fs from "node:fs"
import matter from "gray-matter"
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
// Markdown plugins
import LinkAttributes from "markdown-it-link-attributes"
import anchor from "markdown-it-anchor"
import emoji from "markdown-it-emoji"
import footnote from "markdown-it-footnote"
import mark from "markdown-it-mark"
// Other
import Unocss from "unocss/vite"
import autoprefixer from "autoprefixer"

import {
  containerPlugin,
  highlight,
  highlightLinePlugin,
  imagePlugin,
  katexPlugin,
  lineNumberPlugin,
  preWrapperPlugin,
} from "./src/plugins/markdown"
import { slugify } from "./src/utils"
import { getCreateTime, getGitStat, getUpdateTime } from "./src/utils/git"

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
        if (route.component.endsWith(".md")) {
          const path = resolve(__dirname, route.component.slice(1))
          const md = fs.readFileSync(path, "utf-8")
          const { author, email, commits } = getGitStat(path) || {}
          const createTime = getCreateTime(path)
          const updateTime = getUpdateTime(path)

          const { data, excerpt } = matter(md, {
            excerpt_separator: "<!-- more -->",
          })
          const frontmatter = {
            frontmatter: Object.assign(data, { excerpt }),
            author,
            email,
            commits,
            createTime,
            updateTime,
            path: route.path,
          }
          route.meta = Object.assign(route.meta || {}, frontmatter)
        } else {
          route.meta = { frontmatter: {} }
        }
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
      //   return {
      //     head,
      //     frontmatter: _frontmatter,
      //   }
      // },
      wrapperComponent: "post",
      headEnabled: true,
      markdownItOptions: {
        // https://prismjs.com/
        highlight: await highlight("one-dark-pro"),
      },
      markdownItUses: [
        // local
        highlightLinePlugin,
        imagePlugin,
        preWrapperPlugin,
        lineNumberPlugin,
        katexPlugin,
        // remote
        emoji,
        footnote,
        mark,
      ],
      markdownItSetup(md) {
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: "_blank",
            rel: "noopener noreferrer",
          },
        })
          .use(containerPlugin)
          // related: antfu/antfu.me
          // https://github.com/valeriangalliat/markdown-it-anchor
          .use(anchor, {
            level: 1,
            slugify,
            permalink: anchor.permalink.linkInsideHeader({
              symbol: "#",
              renderAttrs: () => ({ "aria-hidden": "true" }),
              placement: "before",
            }),
          })
      },
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
    },
    dirStyle: "nested",
    script: "defer",
    formatting: "minify",
    // onBeforePageRender(_route, indexHTML) {
    //   const RE = /.*(<link rel="stylesheet".*?>).*/
    //   const match = RE.exec(indexHTML)
    //   if (match) {
    //     const stylesheetLinkTag = match[1].trim()
    //     indexHTML = indexHTML.replace(stylesheetLinkTag, "")
    //     indexHTML = indexHTML.replace(
    //       "<!-- script-slot -->",
    //       stylesheetLinkTag,
    //     )
    //   }
    //   return indexHTML
    // },
    // onBeforePageRender: (route, indexHtml) => {
    //   console.log("route: ", route)
    //   console.log("indexHtml: ", indexHtml)
    //   return indexHtml
    // },
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
