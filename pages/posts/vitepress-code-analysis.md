---
title: Vitepress 源码解析
subtitle: 源码解析
date: 2022-11-30
headerMask: rgba(0, 0, 0, .6)
headerImage: /img/ssg-tools.jpg
---

测试摘要
<!-- more -->

## 放在前面

SSG: 静态内容生成

## TODO

文章排序，分类，内容检索

## 入口

命令行入口文件

```ts
// src/node/cli.ts
import c from "picocolors" // 控制台颜色库
import minimist from "minimist" // 命令行参数解析库
import { version } from "../../package.json"
import { build, createServer, serve } from "." // 从index.ts中导入

const argv: any = minimist(process.argv.slice(2))

console.log(c.cyan(`vitepress v${version}`))

const command = argv._[0]
const root = argv._[command ? 1 : 0]
if (root)
  argv.root = root

if (!command || command === "dev") {
  const createDevServer = async () => {
    // root: 项目根目录 通常为docs; argv: 命令函参数; recreateServer: 当服务失败时重建的回调
    const server = await createServer(root, argv, async () => {
      await server.close()
      await createDevServer()
    })
    await server.listen()
    console.log()
    server.printUrls()
  }
  createDevServer().catch((err) => {
    console.error(c.red("failed to start server. error:\n"), err)
    process.exit(1)
  })
} else if (command === "build") {
  build(root, argv).catch((err) => {
    console.error(c.red("build error:\n"), err)
    process.exit(1)
  })
} else if (command === "serve") {
  serve(argv).catch((err) => {
    console.error(c.red("failed to start server. error:\n"), err)
    process.exit(1)
  })
} else {
  console.log(c.red(`unknown command "${command}".`))
  process.exit(1)
}
```

## 开发模式

当使用`vitepress [dev]`命令启动时，调用 `createServer` 创建 http 服务，

```ts
// src/node/server.ts
export async function createServer(
  root: string = process.cwd(),
  serverOptions: ServerOptions = {},
  recreateServer?: () => Promise<void>
) {
  const config = await resolveConfig(root)

  if (serverOptions.base) {
    config.site.base = serverOptions.base
    delete serverOptions.base
  }

  dns.setDefaultResultOrder("verbatim")

  return createViteServer({
    root: config.srcDir,
    base: config.site.base,
    // logLevel: 'warn',
    plugins: await createVitePressPlugin(config, false, {}, {}, recreateServer),
    server: serverOptions
  })
}
```

### 解析配置文件

解析配置文件的主方法

```ts
// src/node/config.ts
async function resolveConfig(
  root = process.cwd(), // 若执行vitepress命令是没有指定目录，则使用项目根路径
  command = "serve",
  mode = "development"
) {
  // 1. 读取用户配置文件
  const [userConfig, configPath, configDeps] = await resolveUserConfig(
    root,
    command,
    mode
  )
  // 2. 处理站点数据
  const site = await resolveSiteData(root, userConfig)
  const srcDir = path$s.resolve(root, userConfig.srcDir || ".")
  const outDir = userConfig.outDir
    ? path$s.resolve(root, userConfig.outDir)
    : resolve(root, "dist")
  const userThemeDir = resolve(root, "theme")
  const themeDir = (await fs$c.pathExists(userThemeDir))
    ? userThemeDir
    : DEFAULT_THEME_PATH
  const pages = (
    await out(["**.md"], {
      cwd: srcDir,
      ignore: ["**/node_modules", ...(userConfig.srcExclude || [])],
    })
  ).sort()
  const config = {
    root,
    srcDir,
    site,
    themeDir,
    pages,
    configPath,
    configDeps,
    outDir,
    tempDir: resolve(root, ".temp"),
    markdown: userConfig.markdown,
    lastUpdated: userConfig.lastUpdated,
    vue: userConfig.vue,
    vite: userConfig.vite,
    shouldPreload: userConfig.shouldPreload,
    mpa: !!userConfig.mpa,
    ignoreDeadLinks: userConfig.ignoreDeadLinks,
    cleanUrls: userConfig.cleanUrls || "disabled",
    buildEnd: userConfig.buildEnd,
    transformHead: userConfig.transformHead,
    transformHtml: userConfig.transformHtml,
  }
  return config
}

const supportedConfigExtensions = ["js", "ts", "cjs", "mjs", "cts", "mts"]
async function resolveUserConfig(
  root: string,
  command: "serve" | "build",
  mode: string
): Promise<[UserConfig, string | undefined, string[]]> {
  // 1.1 推测配置文件路径
  const configPath = supportedConfigExtensions
    .map(ext => resolve(root, `config.${ext}`))
    .find(fs$c.pathExistsSync)

  let userConfig: RawConfigExports = {}
  let configDeps: string[] = []
  if (!configPath) {
    debug("no config file found.")
  } else {
    // 读取配置文件和配置文件依赖项
    const configExports = await loadConfigFromFile(
      // https://vitejs.dev/guide/api-javascript.html#loadconfigfromfile
      { command, mode },
      configPath,
      root
    )
    if (configExports) {
      userConfig = configExports.config
      configDeps = configExports.dependencies.map(file =>
        normalizePath(path$s.resolve(file))
      )
    }
    debug$3(`loaded config at ${picocolors.exports.yellow(configPath)}`)
  }
  return [await resolveConfigExtends(userConfig), configPath, configDeps]
}

async function resolveConfigExtends(
  config: RawConfigExports
): Promise<UserConfig> {
  const resolved = await (typeof config === "function" ? config() : config)
  if (resolved.extends) {
    const base = await resolveConfigExtends(resolved.extends)
    return mergeConfig(base, resolved)
  }
  return resolved
}

function mergeConfig(a: UserConfig, b: UserConfig, isRoot = true) {
  const merged: Record<string, any> = { ...a }
  for (const key in b) {
    const value = b[key as keyof UserConfig]
    if (value == null)
      continue

    const existing = merged[key]
    if (Array.isArray(existing) && Array.isArray(value)) {
      merged[key] = [...existing, ...value]
      continue
    }
    if (isObject(existing) && isObject(value)) {
      if (isRoot && key === "vite")
        merged[key] = mergeViteConfig(existing, value)
      else merged[key] = mergeConfig(existing, value, false)

      continue
    }
    merged[key] = value
  }
  return merged
}
```
