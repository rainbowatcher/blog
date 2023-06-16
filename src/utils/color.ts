type ColorType = "rgba" | "rgb" | "hex" | "hsl";

export function randomColor(type: ColorType = "hex"): string {
  function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function rgbToHex(r: number, g: number, b: number): string {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
  }

  const r = randomInt(0, 255)
  const g = randomInt(0, 255)
  const b = randomInt(0, 255)
  const a = randomInt(0, 100) / 100

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
      const l = randomInt(0, 100)
      return `hsl(${h}, ${s}%, ${l}%)`
    }
    default:
      return rgbToHex(r, g, b)
  }
}
