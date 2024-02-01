<!-- ref: https://github.com/mermaid-js/mermaid/blob/develop/packages/mermaid/src/docs/.vitepress/theme/Mermaid.vue  -->
<script lang="ts" setup>
import mermaid, { MermaidConfig } from "mermaid"
import { onMounted, onUnmounted, ref } from "vue"

const props = defineProps({
    graph: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
})

const svg = ref("")
let mut: MutationObserver | undefined = undefined

onMounted(async () => {
    mut = new MutationObserver(() => renderChart())
    mut.observe(document.documentElement, { attributes: true })
    await renderChart()

    // refresh images on first render
    const hasImages = /<img([\w\W]+?)>/.exec(decodeURIComponent(props.graph))?.length || 0 > 0
    if (hasImages)
        setTimeout(() => {
            const imgElements = document.getElementsByTagName("img")
            const imgs = Array.from(imgElements)
            if (imgs.length) {
                Promise.all(
                    imgs
                        .filter(img => !img.complete)
                        .map(
                            img =>
                                new Promise((resolve) => {
                                    img.onload = img.onerror = resolve
                                }),
                        ),
                ).then(() => {
                    renderChart()
                })
            }
        }, 100)
})

onUnmounted(() => mut?.disconnect())

async function render(id: string, code: string, config: MermaidConfig): Promise<string> {
    mermaid.initialize(config)
    const { svg } = await mermaid.render(id, code)
    return svg
}

async function renderChart() {
    // console.log(`rendering chart${props.id}${props.graph}`)
    const hasDarkClass = document.documentElement.classList.contains("dark")
    const mermaidConfig = {
        securityLevel: "loose",
        startOnLoad: false,
        theme: hasDarkClass ? "dark" : "default",
    }

    // console.log({ mermaidConfig })
    const svgCode = await render(props.id, decodeURIComponent(props.graph), mermaidConfig)
    // This is a hack to force v-html to re-render, otherwise the diagram disappears
    // when **switching themes** or **reloading the page**.
    // The cause is that the diagram is deleted during rendering (out of Vue's knowledge).
    // Because svgCode does NOT change, v-html does not re-render.
    // This is not required for all diagrams, but it is required for c4c, mindmap and zenuml.
    const salt = Math.random().toString(36).substring(7)
    svg.value = `${svgCode} <span style="display: none">${salt}</span>`
}
</script>

<template>
    <div v-html="svg" />
</template>
