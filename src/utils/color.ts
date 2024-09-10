import { randomInt } from "./utilities"

type ColorType = "rgba" | "rgb" | "hex" | "hsl"

function rgbToHex(r: number, g: number, b: number): string {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export function randomColor(type: ColorType = "hex", minBright = 0): string {
    let r, g, b
    do {
        r = randomInt(0, 255)
        g = randomInt(0, 255)
        b = randomInt(0, 255)
    } while (r + g + b < minBright * 255 * 3)

    const a = randomInt(1, 100) / 100

    switch (type) {
        case "rgba":
            return `rgba(${r}, ${g}, ${b}, ${a})`
        case "rgb":
            return `rgb(${r}, ${g}, ${b})`
        case "hex":
            return rgbToHex(r, g, b)
        case "hsl": {
            const h = randomInt(0, 360)
            const s = randomInt(0, 100)
            const l = randomInt(minBright, 100)
            return `hsl(${h}, ${s}%, ${l}%)`
        }
        default:
            return rgbToHex(r, g, b)
    }
}

if (import.meta.vitest) {
    const { describe, it, expect } = import.meta.vitest

    describe("randomColor", () => {
        it("should return a hex color by default", () => {
            const color = randomColor()
            expect(color).toMatch(/^#[0-9a-f]{6}$/)
        })

        it("should return a rgba color", () => {
            const color = randomColor("rgba")
            expect(color).toMatch(/^rgba\(\d+, \d+, \d+, (0(\.\d+)?|1(\.0+)?)\)$/)
        })

        it("should return a rgb color", () => {
            const color = randomColor("rgb")
            expect(color).toMatch(/^rgb\(\d+, \d+, \d+\)$/)
        })

        it("should return a hsl color", () => {
            const color = randomColor("hsl")
            expect(color).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/)
        })

        it("should have a min brightness", () => {
            const color = randomColor("rgb", 0.2)
            const [r, g, b] = color.match(/\d+/g)!.map(Number)
            expect(r + g + b).toBeGreaterThan(0.2 * 255 * 3)
        })
    })
}
