import { ViteSSG } from "vite-ssg"
import App from "./App.vue"
import type { UserModule } from "./types"
import { scrollBehavior } from "./modules/router"
import routes from "~pages"

import "@unocss/reset/normalize.css"
import "@unocss/reset/tailwind.css"
import "~/styles/theme.scss"
import "~/styles/fonts.scss"
import "~/styles/main.scss"
import "~/styles/container.scss"
import "uno.css"

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL, scrollBehavior },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(
      import.meta.glob<{ install: UserModule }>("./modules/*.ts", {
        eager: true,
      }),
    ).forEach((i) => { i.install?.(ctx) })
    // ctx.app.use(Preview)
  },
)
