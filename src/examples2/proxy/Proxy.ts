/* eslint-disable @typescript-eslint/no-unused-vars */

// Subject 인터페이스
export interface DataService {
    getData(id: string): Promise<string>
    saveData(id: string, data: string): Promise<void>
}

// Real Subject
export class RealDataService implements DataService {
    async getData(id: string): Promise<string> {
        // 실제 API 호출 시뮬레이션
        console.log(`📡 실제 서버에 데이터 요청: ${id}`)
        await new Promise(resolve => setTimeout(resolve, 1000))
        return `ID: ${id}의 데이터입니다`
    }

    async saveData(id: string, data: string): Promise<void> {
        console.log(`💾 서버에 데이터 저장: ${id}`)
        await new Promise(resolve => setTimeout(resolve, 800))
    }
}

// Proxy
export class DataServiceProxy implements DataService {
    private realService: RealDataService
    private cache: Map<string, string> = new Map()
    private accessLog: string[] = []
    private requestCount: number = 0
    private cacheHits: number = 0

    constructor() {
        this.realService = new RealDataService()
    }

    async getData(id: string): Promise<string> {
        this.requestCount++
        this.accessLog.push(`🔍 데이터 요청: ${id}`)

        // 캐시 확인
        if (this.cache.has(id)) {
            this.cacheHits++
            console.log(`✅ 캐시에서 반환: ${id}`)
            this.accessLog.push(`✅ 캐시 히트: ${id}`)
            return this.cache.get(id)!
        }

        // 캐시 미스 - 실제 서비스 호출
        console.log(`❌ 캐시 미스: ${id}`)
        this.accessLog.push(`❌ 캐시 미스: ${id}`)
        const result: string = await this.realService.getData(id)

        // 캐시에 저장
        this.cache.set(id, result)
        this.accessLog.push(`💾 캐시 저장: ${id}`)

        return result
    }

    async saveData(id: string, data: string): Promise<void> {
        console.log(`🔐 권한 확인 중...`)
        this.accessLog.push(`🔐 권한 확인: ${id}`)

        // 권한 검증 (데이터 길이 확인)
        if (data.length > 100) {
            console.log(`❌ 데이터 크기 초과 (최대 100자)`)
            this.accessLog.push(`❌ 권한 거부: 데이터 크기 초과`)
            throw new Error('데이터 크기가 100자를 초과할 수 없습니다')
        }

        // 캐시 무효화
        this.cache.delete(id)
        this.accessLog.push(`🗑️ 캐시 무효화: ${id}`)

        // 실제 서비스 호출
        await this.realService.saveData(id, data)
        this.accessLog.push(`✅ 데이터 저장 완료: ${id}`)
    }

    getAccessLog(): string[] {
        return this.accessLog
    }

    getCacheHitRate(): number {
        if (this.requestCount === 0) return 0
        return Math.round((this.cacheHits / this.requestCount) * 100)
    }

    getCacheSize(): number {
        return this.cache.size
    }

    getRequestCount(): number {
        return this.requestCount
    }

    clearCache(): void {
        this.cache.clear()
        this.accessLog.push(`🗑️ 전체 캐시 클리어`)
    }

    clearLog(): void {
        this.accessLog = []
    }
}
