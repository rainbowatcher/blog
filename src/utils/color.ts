import { randomInt } from "./utilities"

type ColorType = "rgba" | "rgb" | "hex" | "hsl";

export function randomColor(type: ColorType = "hex", minBright = 0): string {

  function rgbToHex(r: number, g: number, b: number): string {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
  }

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
