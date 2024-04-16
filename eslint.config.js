import antfu from "@antfu/eslint-config"

export default antfu({
    stylistic: {
        indent: 4, // 4, or 'tab'
        quotes: "double", // or 'double'
    },
    unocss: true,
    rules: {
        curly: "off",
    },
    ignores: [".github/**"],
})
