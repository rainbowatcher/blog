export function throttleAndDebounce(fn: () => void, delay: number): () => void {
    let timeoutId: NodeJS.Timeout
    let isCalled = false

    return () => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        if (!isCalled) {
            fn()
            isCalled = true
            setTimeout(() => {
                isCalled = false
            }, delay)
        }
        else {
            timeoutId = setTimeout(fn, delay)
        }
    }
}

export function randomInt(max: number): number;
export function randomInt(min: number, max: number): number;
export function randomInt(minOrMax: number, max?: number): number {
    if (max === undefined) {
        return Math.floor(Math.random() * (minOrMax + 1))
    }
    else if (minOrMax > max) {
        throw new Error("first param should always less than the second param")
    }
    return Math.floor(Math.random() * (max - minOrMax + 1) + minOrMax)
}

if (import.meta.vitest) {
    const { describe, it, expect } = import.meta.vitest
    describe("randomInt", () => {
        it("should generate a random number between 0 and the given maximum number", () => {
            const max = 10
            const randomNumber = randomInt(max)
            expect(randomNumber).toBeGreaterThanOrEqual(0)
            expect(randomNumber).toBeLessThanOrEqual(max)
            expect(Number.isInteger(randomNumber)).toBe(true)
        })

        it("should generate a random number between the given minimum and maximum numbers", () => {
            const min = 5
            const max = 10
            const randomNumber = randomInt(min, max)
            expect(randomNumber).toBeGreaterThanOrEqual(min)
            expect(randomNumber).toBeLessThanOrEqual(max)
            expect(Number.isInteger(randomNumber)).toBe(true)
        })

        it("should throw error", () => {
            const min = 15
            const max = 10
            expect(() => randomInt(min, max)).toThrowError()
        })
    })
}
