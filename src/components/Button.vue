<script lang="ts" setup>
const props = withDefaults(defineProps<Props>(), {
    round: "2xl",
    color: "blue",
    size: "lg",
    disabled: false,
})

interface Props {
    round?: "none" | "sm" | "md" | "lg" | "xl" | "2xl"
    color: string
    size: "sm" | "md" | "lg" | "xl"
    disabled: boolean
}

function mapRound(round: string): string {
    switch (round) {
        case "sm":
            return "rounded-sm"
        case "md":
            return "rounded-md"
        case "lg":
            return "rounded-lg"
        case "xl":
            return "rounded-xl"
        case "2xl":
            return "rounded-2xl"
        default:
            return ""
    }
}

function classList() {
    const { round, color, size } = props
    const _round = mapRound(round)
    return [
        "px-2 py-1",
        _round,
        `bg-${color}`,
        `hover:bg-${color}-500`,
        `text-${size}`,
    ]
}
</script>

<template>
    <button :class="classList()">
        React
    </button>
</template>
