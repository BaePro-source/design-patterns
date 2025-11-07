<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  BubbleSortStrategy,
  QuickSortStrategy,
  MergeSortStrategy,
  Sorter,
  type SortStrategy
} from '@/examples2/strategy/Strategy'

const arrayInput = ref<string>('64, 34, 25, 12, 22, 11, 90, 88, 45, 50')
const selectedStrategy = ref<'bubble' | 'quick' | 'merge'>('bubble')
const sortedArray = ref<number[]>([])
const executionTime = ref<number>(0)
const sortHistory = ref<{ strategy: string; array: string; time: number }[]>([])
const isLoading = ref<boolean>(false)

const strategies = [
  { id: 'bubble', label: '🫧 버블 정렬', emoji: '🫧' },
  { id: 'quick', label: '⚡ 퀵 정렬', emoji: '⚡' },
  { id: 'merge', label: '🔀 병합 정렬', emoji: '🔀' }
]

function getStrategy(): SortStrategy {
  switch (selectedStrategy.value) {
    case 'bubble':
      return new BubbleSortStrategy()
    case 'quick':
      return new QuickSortStrategy()
    case 'merge':
      return new MergeSortStrategy()
    default:
      return new BubbleSortStrategy()
  }
}

function parseArray(): number[] {
  return arrayInput.value
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n))
}

function executeSort(): void {
  const array = parseArray()

  if (array.length === 0) {
    alert('유효한 숫자를 입력하세요')
    return
  }

  isLoading.value = true

  // 비동기 처리로 UI가 블로킹되지 않도록 함
  setTimeout(() => {
    const strategy = getStrategy()
    const sorter = new Sorter(strategy)

    const startTime = performance.now()
    sortedArray.value = sorter.sort(array)
    const endTime = performance.now()

    executionTime.value = Number((endTime - startTime).toFixed(4))

    // 히스토리 추가
    sortHistory.value.unshift({
      strategy: sorter.getStrategyName(),
      array: `[${sortedArray.value.join(', ')}]`,
      time: executionTime.value
    })

    isLoading.value = false
  }, 10)
}

function randomArray(): void {
  const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))
  arrayInput.value = arr.join(', ')
}

function clearHistory(): void {
  sortHistory.value = []
  sortedArray.value = []
  executionTime.value = 0
}

function reset(): void {
  arrayInput.value = '64, 34, 25, 12, 22, 11, 90, 88, 45, 50'
  sortedArray.value = []
  executionTime.value = 0
  sortHistory.value = []
}
</script>

<template>
  <section style="padding: 20px; max-width: 1000px">
    <h2>🎯 Strategy Pattern</h2>

    <p style="color: #666; font-size: 14px; margin-bottom: 24px">
      전략 패턴을 사용하여 런타임에 정렬 알고리즘을 선택하고 비교합니다
    </p>

    <!-- 입력 영역 -->
    <div style="padding: 20px; border: 2px solid #3498db; border-radius: 8px; margin-bottom: 20px">
      <h3 style="margin-top: 0; color: #3498db">📥 배열 입력</h3>

      <div style="margin-bottom: 16px">
        <label style="display: block; margin-bottom: 8px; font-weight: 500">정렬할 배열 (쉼표로 구분):</label>
        <textarea
            v-model="arrayInput"
            style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 13px; min-height: 80px; font-family: 'Courier New', monospace"
            placeholder="예: 64, 34, 25, 12, 22, 11, 90"
        ></textarea>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        <button
            @click="randomArray"
            style="padding: 10px 20px; background: #9b59b6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 12px"
        >
          🎲 랜덤 배열
        </button>
        <button
            @click="reset"
            style="padding: 10px 20px; background: #95a5a6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 12px"
        >
          🔄 초기화
        </button>
      </div>
    </div>

    <!-- 전략 선택 및 정렬 -->
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 24px">
      <!-- 전략 선택 -->
      <div style="padding: 20px; border: 2px solid #42b883; border-radius: 8px">
        <h3 style="margin-top: 0; color: #42b883">🎨 정렬 전략 선택</h3>

        <div style="display: flex; flex-direction: column; gap: 12px">
          <label
              v-for="strategy in strategies"
              :key="strategy.id"
              style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 2px solid #ddd; border-radius: 6px; cursor: pointer; transition: all 0.2s"
              :style="{
              borderColor: selectedStrategy === strategy.id ? '#42b883' : '#ddd',
              background: selectedStrategy === strategy.id ? '#f0fdf4' : 'white'
            }"
          >
            <input
                type="radio"
                :value="strategy.id"
                v-model="selectedStrategy"
                style="width: 18px; height: 18px; cursor: pointer"
            />
            <span style="font-weight: 500">{{ strategy.emoji }} {{ strategy.label }}</span>
          </label>
        </div>
      </div>

      <!-- 정렬 버튼 -->
      <div style="padding: 20px; border: 2px solid #e74c3c; border-radius: 8px; display: flex; flex-direction: column; justify-content: center">
        <button
            @click="executeSort"
            :disabled="isLoading"
            style="padding: 20px; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 16px"
            :style="{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }"
        >
          {{ isLoading ? '⏳ 정렬중...' : '▶️ 정렬 실행' }}
        </button>
      </div>
    </div>

    <!-- 결과 표시 -->
    <div v-if="sortedArray.length > 0" style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white; margin-bottom: 24px">
      <div style="margin-bottom: 16px">
        <div style="font-size: 12px; opacity: 0.9; margin-bottom: 4px">✨ 정렬 결과</div>
        <div style="font-size: 13px; font-family: 'Courier New', monospace; word-break: break-all; line-height: 1.6">
          [{{ sortedArray.join(', ') }}]
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px">
        <div style="background: rgba(255, 255, 255, 0.2); padding: 12px; border-radius: 6px; text-align: center">
          <div style="font-size: 11px; opacity: 0.9">실행 시간</div>
          <div style="font-size: 18px; font-weight: bold">{{ executionTime }} ms</div>
        </div>
        <div style="background: rgba(255, 255, 255, 0.2); padding: 12px; border-radius: 6px; text-align: center">
          <div style="font-size: 11px; opacity: 0.9">배열 크기</div>
          <div style="font-size: 18px; font-weight: bold">{{ sortedArray.length }}</div>
        </div>
      </div>
    </div>

    <!-- 히스토리 -->
    <div v-if="sortHistory.length > 0">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px">
        <h3 style="margin: 0">📊 정렬 히스토리</h3>
        <button
            @click="clearHistory"
            style="padding: 8px 16px; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 12px"
        >
          🗑️ 삭제
        </button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 12px">
        <div
            v-for="(item, index) in sortHistory"
            :key="index"
            style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; background: #f9f9f9"
        >
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px">
            <div>
              <div style="font-weight: 600; color: #2c3e50; margin-bottom: 4px">{{ item.strategy }}</div>
              <div style="font-size: 12px; color: #7f8c8d">실행 #{{ sortHistory.length - index }}</div>
            </div>
            <div style="text-align: right">
              <div style="font-weight: 600; color: #e74c3c">⏱️ {{ item.time }} ms</div>
            </div>
          </div>

          <div style="background: white; padding: 12px; border-radius: 4px; font-size: 12px; font-family: 'Courier New', monospace; color: #555; word-break: break-all; max-height: 60px; overflow-y: auto">
            {{ item.array }}
          </div>
        </div>
      </div>
    </div>

    <div v-else style="margin-top: 30px; padding: 40px; background: #f9f9f9; border-radius: 6px; text-align: center; color: #999">
      📭 아직 정렬 이력이 없습니다. 배열을 정렬해보세요!
    </div>

    <!-- 알고리즘 설명 -->
    <div style="margin-top: 30px; padding: 16px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px">
      <h4 style="margin: 0 0 8px 0; color: #92400e; font-size: 14px">💡 패턴 설명</h4>
      <p style="margin: 0; color: #78350f; font-size: 13px; line-height: 1.6">
        전략 패턴은 동일한 문제를 해결하는 여러 개의 알고리즘을 캡슐화하여,
        런타임에 필요한 알고리즘을 선택할 수 있게 합니다.
        각 알고리즘의 장단점을 직접 비교하면서 최적의 전략을 선택할 수 있습니다.
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

textarea::-webkit-scrollbar,
div::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track,
div::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb,
div::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover,
div::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
