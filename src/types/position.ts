const lengthUnits = ["px", "rem", "em"]
export type LengthUnit = typeof lengthUnits[number]
const lengthRE = /^(-?\d+(?:\.\d*)?|\.\d+)(px|rem|em)?$/

export class Length {
    public static valueOf(length?: string): Length | undefined {
        if (!length) {
            return undefined
        }

        const match = lengthRE.exec(length)
        if (!match) {
            return undefined
        }

        const size = Number(match[1])
        const unit = match[2] || "px"
        if (isNaN(size) || !lengthUnits.includes(unit)) {
            return undefined
        }

        return new Length(size, unit)
    }

    public size: number
    public unit: LengthUnit

    constructor(size: number, unit: LengthUnit) {
        this.size = size
        this.unit = unit
    }
}

export interface Position {
    top?: Length
    bottom?: Length
    left?: Length
    right?: Length
}

if (import.meta.vitest) {
    const { it, expect, describe } = import.meta.vitest
    describe("Length", () => {
        describe("valueOf", () => {
            it("should return undefined for empty string", () => {
                expect(Length.valueOf("")).toBeUndefined()
            })

            it("should return undefined for invalid length string", () => {
                expect(Length.valueOf("abc")).toBeUndefined()
                expect(Length.valueOf("10abc")).toBeUndefined()
                expect(Length.valueOf("10 ")).toBeUndefined()
            })

            it("should return undefined for invalid unit", () => {
                expect(Length.valueOf("10mm")).toBeUndefined()
            })

            it("should return Length object for valid length string", () => {
                expect(Length.valueOf("10px")).toEqual(new Length(10, "px"))
                expect(Length.valueOf("10rem")).toEqual(new Length(10, "rem"))
                expect(Length.valueOf("2.5px")).toEqual(new Length(2.5, "px"))
                expect(Length.valueOf(".5em")).toEqual(new Length(0.5, "em"))
                expect(Length.valueOf("-0.5em")).toEqual(new Length(-0.5, "em"))
            })

            it("should return Length object with default unit if unit is not provided", () => {
                expect(Length.valueOf("10")).toEqual(new Length(10, "px"))
                expect(Length.valueOf("2.5")).toEqual(new Length(2.5, "px"))
            })
        })
    })
}
