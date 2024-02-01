import { createI18n } from "vue-i18n"
import { type UserModule } from "~/types"

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
const messages = Object.fromEntries(
    Object.entries(
        import.meta.glob<{ default: any }>("../locales/*.y(a)?ml", { eager: true }))
        .map(([key, value]) => {
            const lastSlash = key.lastIndexOf("/")
            const lastDot = key.lastIndexOf(".")
            return [key.slice(lastSlash + 1, lastDot), value.default]
        }),
)

export const install: UserModule = ({ app }) => {
    const i18n = createI18n({
        legacy: false,
        locale: "zh-CN",
        messages,
    })

    app.use(i18n)
}
