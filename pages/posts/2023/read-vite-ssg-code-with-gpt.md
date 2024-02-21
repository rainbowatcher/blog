---
layout: post
title: Vite SSG 源码解析（GPT）
subtitle:
date: 2023-06-27
permalinkPattern: /post/:year/:month/:day/:slug/
useHeaderImage: true
hide: true
tags: [Vite, SSG]
---

## 入口

[vite-ssg](https://github.com/antfu/vite-ssg) 的 readme 中介绍了使用方法

1. 安装依赖

```shell
pnpm i -D vite-ssg vue-router @unhead/vue
```

其实和普通 vite 应用的区别只是多引入了`vite-ssg`，另外的`@unhead/vue`只是一个可选依赖，在配置中指定`usehead: false`则不需要引入

1. 修改 package.json

```diff [package.json]
{
  "scripts": {
    "dev": "vite",
-   "build": "vite build"
+   "build": "vite-ssg build"

    // OR if you want to use another vite config file
+   "build": "vite-ssg build -c another-vite.config.ts"
  }
}
```

开发环境还是使用`vite`，修改的点是构建命令，意味着`vite-ssg`有自己的构建逻辑

1. 修改 main.ts

```typescript [src/main.ts]
import { ViteSSG } from "vite-ssg"
import App from "./App.vue"
import routes from "~pages" // vite-plugin-pages

// `export const createApp` is required instead of the original `createApp(App).mount('#app')`
export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes },
  // function to have custom setups
  ({ app, router, routes, isClient, initialState }) => {
    // install plugins etc.
  },
)
```

这里引如了`ViteSSG`，并将根组件和路由信息传入，第三个参数是`vite-ssg`提供的页面初始化函数，提供了一个上下文对象

## 源码解读

### 开发环境

在`src/client/index.ts`中定义了`ViteSSG`方法

```ts
export function ViteSSG(
  App: Component,
  routerOptions: RouterOptions,
  fn?: (context: ViteSSGContext<true>) => Promise<void> | void,
  options: ViteSSGClientOptions = {},
) {
  // ...
}
```

<!-- ::: details RouterOptions
```ts
/**
 * Options to initialize a {@link Router} instance.
 */
export declare interface RouterOptions extends PathParserOptions {
    /**
     * History implementation used by the router. Most web applications should use
     * `createWebHistory` but it requires the server to be properly configured.
     * You can also use a _hash_ based history with `createWebHashHistory` that
     * does not require any configuration on the server but isn't handled at all
     * by search engines and does poorly on SEO.
     *
     * @example
     * ```js
     * createRouter({
     *   history: createWebHistory(),
     *   // other options...
     * })
     * ```
     */
    history: RouterHistory;
    /**
     * Initial list of routes that should be added to the router.
     */
    routes: Readonly<RouteRecordRaw[]>;
    /**
     * Function to control scrolling when navigating between pages. Can return a
     * Promise to delay scrolling. Check {@link ScrollBehavior}.
     *
     * @example
     * ```js
     * function scrollBehavior(to, from, savedPosition) {
     *   // `to` and `from` are both route locations
     *   // `savedPosition` can be null if there isn't one
     * }
     * ```
     */
    scrollBehavior?: RouterScrollBehavior;
    /**
     * Custom implementation to parse a query. See its counterpart,
     * {@link RouterOptions.stringifyQuery}.
     *
     * @example
     * Let's say you want to use the [qs package](https://github.com/ljharb/qs)
     * to parse queries, you can provide both `parseQuery` and `stringifyQuery`:
     * ```js
     * import qs from 'qs'
     *
     * createRouter({
     *   // other options...
     *   parseQuery: qs.parse,
     *   stringifyQuery: qs.stringify,
     * })
     * ```
     */
    parseQuery?: typeof parseQuery;
    /**
     * Custom implementation to stringify a query object. Should not prepend a leading `?`.
     * {@link RouterOptions.parseQuery | parseQuery} counterpart to handle query parsing.
     */
    stringifyQuery?: typeof stringifyQuery;
    /**
     * Default class applied to active {@link RouterLink}. If none is provided,
     * `router-link-active` will be applied.
     */
    linkActiveClass?: string;
    /**
     * Default class applied to exact active {@link RouterLink}. If none is provided,
     * `router-link-exact-active` will be applied.
     */
    linkExactActiveClass?: string;
}
```
::: -->

这个函数在 App 启动时调用，主要逻辑如下

1. 解构用户配置
2. 根据环境和配置决定 vue 应用的创建逻辑
   1. 开发环境创建 SPA 应用并使用 WebHistory
   2. 生产环境创建 SSR 应用并使用 [MemoryHistory](https://router.vuejs.org/api/#Functions-createMemoryHistory)
3. 根据环境处理全局state
4.
