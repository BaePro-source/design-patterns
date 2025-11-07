/* eslint-disable @typescript-eslint/no-unused-vars */

// Strategy 인터페이스
export interface SortStrategy {
    sort(arr: number[]): number[]
    getName(): string
}

// 버블 정렬 전략
export class BubbleSortStrategy implements SortStrategy {
    sort(arr: number[]): number[] {
        const result: number[] = [...arr]
        const n: number = result.length

        for (let i: number = 0; i < n; i++) {
            for (let j: number = 0; j < n - i - 1; j++) {
                if (result[j] > result[j + 1]) {
                    const temp: number = result[j]
                    result[j] = result[j + 1]
                    result[j + 1] = temp
                }
            }
        }

        return result
    }

    getName(): string {
        return 'Bubble Sort (버블 정렬)'
    }
}

// 퀵 정렬 전략
export class QuickSortStrategy implements SortStrategy {
    sort(arr: number[]): number[] {
        if (arr.length <= 1) return arr

        const pivot: number = arr[Math.floor(arr.length / 2)]
        const left: number[] = arr.filter(x => x < pivot)
        const middle: number[] = arr.filter(x => x === pivot)
        const right: number[] = arr.filter(x => x > pivot)

        return [...this.sort(left), ...middle, ...this.sort(right)]
    }

    getName(): string {
        return 'Quick Sort (퀵 정렬)'
    }
}

// 병합 정렬 전략
export class MergeSortStrategy implements SortStrategy {
    sort(arr: number[]): number[] {
        if (arr.length <= 1) return arr

        const mid: number = Math.floor(arr.length / 2)
        const left: number[] = this.sort(arr.slice(0, mid))
        const right: number[] = this.sort(arr.slice(mid))

        return this.merge(left, right)
    }

    private merge(left: number[], right: number[]): number[] {
        const result: number[] = []
        let i: number = 0
        let j: number = 0

        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                result.push(left[i])
                i++
            } else {
                result.push(right[j])
                j++
            }
        }

        return [...result, ...left.slice(i), ...right.slice(j)]
    }

    getName(): string {
        return 'Merge Sort (병합 정렬)'
    }
}

// Context
export class Sorter {
    private strategy: SortStrategy

    constructor(strategy: SortStrategy) {
        this.strategy = strategy
    }

    setStrategy(strategy: SortStrategy): void {
        this.strategy = strategy
    }

    sort(arr: number[]): number[] {
        return this.strategy.sort(arr)
    }

    getStrategyName(): string {
        return this.strategy.getName()
    }
}
