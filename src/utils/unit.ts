import { Length } from "~/types/position"

export function toPx(length: string, initialValue = 0) {
    if (!length) {
        return initialValue
    }

    const fontSize = useFontSize()

    const len = Length.valueOf(length)
    if (len) {
        const { unit, size } = len

        if (unit === "px") {
            return size
        }
        else {
            return Number(toValue(fontSize)) * size
        }
    }

    return initialValue
}
