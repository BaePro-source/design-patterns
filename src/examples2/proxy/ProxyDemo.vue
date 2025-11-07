<script setup lang="ts">
import { ref, reactive } from 'vue'
import { DataServiceProxy } from '@/examples2/proxy/Proxy'

const proxy = new DataServiceProxy()

const userId = ref<string>('user-1')
const saveDataId = ref<string>('user-1')
const saveDataContent = ref<string>('사용자 정보')
const logs = ref<string[]>([])
const isLoading = ref<boolean>(false)

const stats = reactive({
  requestCount: 0,
  cacheHits: 0,
  cacheSize: 0,
  hitRate: 0
})

const userOptions = ['user-1', 'user-2', 'user-3', 'user-4', 'user-5']

function updateStats(): void {
  stats.requestCount = proxy.getRequestCount()
  stats.cacheSize = proxy.getCacheSize()
  stats.hitRate = proxy.getCacheHitRate()
  logs.value = proxy.getAccessLog()
}

async function fetchData(): Promise<void> {
  if (!userId.value.trim()) {
    alert('사용자 ID를 입력하세요')
    return
  }

  isLoading.value = true
  try {
    const result = await proxy.getData(userId.value)
    logs.value.unshift(`📝 결과: ${result}`)
  } catch (error) {
    logs.value.unshift(`❌ 오류: ${error}`)
  } finally {
    isLoading.value = false
    updateStats()
  }
}

async function saveData(): Promise<void> {
  if (!saveDataId.value.trim() || !saveDataContent.value.trim()) {
    alert('ID와 내용을 입력하세요')
    return
  }

  isLoading.value = true
  try {
    await proxy.saveData(saveDataId.value, saveDataContent.value)
    logs.value.unshift(`✅ 저장 성공`)
  } catch (error) {
    logs.value.unshift(`❌ 저장 실패: ${error}`)
  } finally {
    isLoading.value = false
    updateStats()
  }
}

function clearCache(): void {
  proxy.clearCache()
  updateStats()
}

function clearLogs(): void {
  proxy.clearLog()
  updateStats()
}

function resetProxy(): void {
  logs.value = []
  stats.requestCount = 0
  stats.cacheHits = 0
  stats.cacheSize = 0
  stats.hitRate = 0
  userId.value = 'user-1'
  saveDataId.value = 'user-1'
  saveDataContent.value = '사용자 정보'
}
</script>

<template>
  <section style="padding: 20px; max-width: 1000px">
    <h2>🚀 Proxy Pattern</h2>

    <p style="color: #666; font-size: 14px; margin-bottom: 24px">
      프록시 패턴을 사용하여 API 호출을 캐시하고 접근을 제어합니다
    </p>

    <!-- 통계 대시보드 -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; color: white; text-align: center">
        <div style="font-size: 12px; opacity: 0.9; margin-bottom: 4px">총 요청 수</div>
        <div style="font-size: 36px; font-weight: bold">{{ stats.requestCount }}</div>
      </div>

      <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 20px; border-radius: 8px; color: white; text-align: center">
        <div style="font-size: 12px; opacity: 0.9; margin-bottom: 4px">캐시 크기</div>
        <div style="font-size: 36px; font-weight: bold">{{ stats.cacheSize }}</div>
      </div>

      <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 20px; border-radius: 8px; color: white; text-align: center">
        <div style="font-size: 12px; opacity: 0.9; margin-bottom: 4px">캐시 히트율</div>
        <div style="font-size: 36px; font-weight: bold">{{ stats.hitRate }}%</div>
      </div>
    </div>

    <!-- 두 가지 작업 -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px">
      <!-- 데이터 조회 -->
      <div style="padding: 20px; border: 2px solid #3498db; border-radius: 8px">
        <h3 style="margin-top: 0; color: #3498db">📖 데이터 조회 (캐시됨)</h3>

        <div style="margin-bottom: 16px">
          <label style="display: block; margin-bottom: 8px; font-weight: 500">사용자 ID 선택:</label>
          <select
              v-model="userId"
              style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px"
          >
            <option v-for="id in userOptions" :key="id" :value="id">{{ id }}</option>
          </select>
        </div>

        <button
            @click="fetchData"
            :disabled="isLoading"
            style="width: 100%; padding: 12px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 14px; opacity: 1"
            :style="{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }"
        >
          {{ isLoading ? '⏳ 로딩중...' : '🔍 데이터 조회' }}
        </button>

        <p style="color: #888; font-size: 12px; margin-top: 12px">
          💡 같은 ID로 여러 번 조회하면 캐시에서 빠르게 반환됩니다
        </p>
      </div>

      <!-- 데이터 저장 -->
      <div style="padding: 20px; border: 2px solid #42b883; border-radius: 8px">
        <h3 style="margin-top: 0; color: #42b883">💾 데이터 저장 (권한 검증)</h3>

        <div style="margin-bottom: 12px">
          <label style="display: block; margin-bottom: 4px; font-weight: 500; font-size: 13px">사용자 ID:</label>
          <input
              v-model="saveDataId"
              type="text"
              placeholder="user-1"
              style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px"
          />
        </div>

        <div style="margin-bottom: 16px">
          <label style="display: block; margin-bottom: 4px; font-weight: 500; font-size: 13px">데이터 (최대 100자):</label>
          <textarea
              v-model="saveDataContent"
              placeholder="저장할 데이터"
              style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; min-height: 80px; resize: vertical"
          ></textarea>
          <div style="font-size: 11px; color: #888; margin-top: 4px">
            {{ saveDataContent.length }}/100자
          </div>
        </div>

        <button
            @click="saveData"
            :disabled="isLoading"
            style="width: 100%; padding: 12px; background: #42b883; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 14px"
            :style="{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }"
        >
          {{ isLoading ? '⏳ 저장중...' : '💾 데이터 저장' }}
        </button>
      </div>
    </div>

    <!-- 제어 버튼 -->
    <div style="display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap">
      <button
          @click="clearCache"
          style="padding: 10px 16px; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 12px"
      >
        🗑️ 캐시 클리어
      </button>

      <button
          @click="clearLogs"
          style="padding: 10px 16px; background: #f39c12; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 12px"
      >
        📋 로그 클리어
      </button>

      <button
          @click="resetProxy"
          style="padding: 10px 16px; background: #95a5a6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 12px"
      >
        🔄 전체 초기화
      </button>
    </div>

    <!-- 로그 표시 -->
    <div v-if="logs.length > 0">
      <h3 style="margin-bottom: 12px; font-size: 16px">📋 접근 로그</h3>
      <div style="background: #1e1e1e; border-radius: 6px; padding: 16px; max-height: 400px; overflow-y: auto; font-family: 'Courier New', monospace">
        <div
            v-for="(log, index) in logs"
            :key="index"
            style="color: #a3e635; margin-bottom: 6px; font-size: 13px; line-height: 1.6"
        >
          {{ log }}
        </div>
      </div>
    </div>

    <div v-else style="margin-top: 20px; padding: 40px; background: #f9f9f9; border-radius: 6px; text-align: center; color: #999">
      📭 아직 로그가 없습니다. 데이터를 조회하거나 저장해보세요!
    </div>

    <!-- 패턴 설명 -->
    <div style="margin-top: 30px; padding: 16px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px">
      <h4 style="margin: 0 0 8px 0; color: #92400e; font-size: 14px">💡 패턴 설명</h4>
      <p style="margin: 0; color: #78350f; font-size: 13px; line-height: 1.6">
        프록시 패턴은 실제 서비스 객체에 대한 접근을 제어하는 대리자 역할을 합니다.
        캐싱을 통해 성능을 향상시키고, 접근 제어와 로깅을 통해 보안성을 높입니다.
        실제 서비스의 무거운 작업을 지연시키거나 필요할 때만 수행하는 Lazy Loading을 구현할 수 있습니다.
      </p>
    </div>
  </section>
</template>

<style scoped>
button:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
  transition: all 0.2s;
}

button:active:not(:disabled) {
  transform: translateY(0);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 스크롤바 스타일 */
div::-webkit-scrollbar {
  width: 8px;
}

div::-webkit-scrollbar-track {
  background: #2d2d2d;
  border-radius: 4px;
}

div::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 4px;
}

div::-webkit-scrollbar-thumb:hover {
  background: #777;
}
</style>
