import { createHead } from "@unhead/vue"
import type { UserModule } from "~/types"

export const install: UserModule = ({ app, router, isClient }) => {
  const head = createHead()
  app.use(head)
}
