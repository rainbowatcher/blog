// import { resolveUnref } from "@vueuse/core"
// import type { ComputedRef } from "vue"
export type LengthUnit = "px" | "rem" | "em"
const lengthRE = /^\s*([+-]?[\d\.]*)\s*(.*)\s*$/i

export class Length {
  public size: number
  public unit: LengthUnit

  public constructor(size: number, unit: LengthUnit) {
    this.size = size
    this.unit = unit
  }

  public static valueOf(length: string) {
    if (!length || length.length === 1) {
      return new Error("length must greater than 1")
    }
    const match = lengthRE.exec(length)
    if (!match) {
      return new Error("invalid length")
    }
    const size = Number(match[1])
    const unit = match[2] as LengthUnit
    if (isNaN(size)) {
      return new Error("can't parse size")
    }

    return new Length(size, unit)
  }
}

export interface Position {
  top?: Length
  bottom?: Length
  left?: Length
  right?: Length
}
