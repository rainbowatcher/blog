import { type UserModule } from "~/types"

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.afterEach(() => window.scroll({ top: 0, behavior: "smooth" }))
  }
}
