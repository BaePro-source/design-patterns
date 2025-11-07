<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  Stock,
  PriceDisplay,
  PriceAlert,
  PriceLogger
} from '@/examples/observer/Observer'

const stock = new Stock()
const display = new PriceDisplay()
const alert = new PriceAlert(100)
const logger = new PriceLogger()

const currentPrice = ref<number>(50)
const newPrice = ref<number>(60)
const alertThreshold = ref<number>(100)
const logs = ref<string[]>([])

const observers = reactive({
  display: false,
  alert: false,
  logger: false
})

// 콘솔 로그 캡처
function captureConsoleLogs(callback: () => void) {
  const originalLog = console.log
  const tempLogs: string[] = []

  console.log = (...args: any[]) => {
    const message = args.join(' ')
    tempLogs.push(message)
    originalLog.apply(console, args)
  }

  callback()

  console.log = originalLog
  logs.value = [...tempLogs, ...logs.value]
}

function toggleObserver(type: 'display' | 'alert' | 'logger') {
  captureConsoleLogs(() => {
    if (type === 'display') {
      if (observers.display) {
        stock.unregister(display)
        observers.display = false
      } else {
        stock.register(display)
        observers.display = true
      }
    } else if (type === 'alert') {
      if (observers.alert) {
        stock.unregister(alert)
        observers.alert = false
      } else {
        stock.register(alert)
        observers.alert = true
      }
    } else if (type === 'logger') {
      if (observers.logger) {
        stock.unregister(logger)
        observers.logger = false
      } else {
        stock.register(logger)
        observers.logger = true
      }
    }
  })
}

function updatePrice() {
  captureConsoleLogs(() => {
    stock.setPrice(newPrice.value)
    currentPrice.value = newPrice.value
  })
}

function randomPrice() {
  newPrice.value = Math.floor(Math.random() * 200) + 10
  updatePrice()
}

function clearLogs() {
  logs.value = []
}
</script>

<template>
  <section style="padding: 20px; max-width: 800px">
    <h2>👁️ Observer Pattern</h2>

    <p style="color: #666; font-size: 14px; margin-bottom: 20px">
      옵저버 패턴을 사용하여 객체의 상태 변화를 자동으로 통지합니다
    </p>

    <!-- 현재 주가 표시 -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; margin-bottom: 20px; color: white; text-align: center">
      <div style="font-size: 14px; opacity: 0.9; margin-bottom: 8px">현재 주가</div>
      <div style="font-size: 48px; font-weight: bold">{{ currentPrice }}원</div>
    </div>

    <!-- 관찰자 등록/해제 -->
    <div style="margin-bottom: 24px">
      <h3 style="margin-bottom: 12px; font-size: 16px">👥 관찰자 관리</h3>
      <div style="display: flex; flex-direction: column; gap: 10px">
        <label
            style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 2px solid #ddd; border-radius: 6px; cursor: pointer; transition: all 0.2s"
            :style="{
            borderColor: observers.display ? '#42b883' : '#ddd',
            background: observers.display ? '#f0fdf4' : 'white'
          }"
        >
          <input
              type="checkbox"
              v-model="observers.display"
              @change="toggleObserver('display')"
              style="width: 18px; height: 18px; cursor: pointer"
          />
          <div style="flex: 1">
            <div style="font-weight: 500">📺 화면 디스플레이</div>
            <div style="font-size: 12px; color: #666">주가를 화면에 표시합니다</div>
          </div>
        </label>

        <label
            style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 2px solid #ddd; border-radius: 6px; cursor: pointer; transition: all 0.2s"
            :style="{
            borderColor: observers.alert ? '#42b883' : '#ddd',
            background: observers.alert ? '#f0fdf4' : 'white'
          }"
        >
          <input
              type="checkbox"
              v-model="observers.alert"
              @change="toggleObserver('alert')"
              style="width: 18px; height: 18px; cursor: pointer"
          />
          <div style="flex: 1">
            <div style="font-weight: 500">🚨 가격 알림</div>
            <div style="font-size: 12px; color: #666">목표가 초과 시 알림을 보냅니다 (기준: {{ alertThreshold }}원)</div>
          </div>
        </label>

        <label
            style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 2px solid #ddd; border-radius: 6px; cursor: pointer; transition: all 0.2s"
            :style="{
            borderColor: observers.logger ? '#42b883' : '#ddd',
            background: observers.logger ? '#f0fdf4' : 'white'
          }"
        >
          <input
              type="checkbox"
              v-model="observers.logger"
              @change="toggleObserver('logger')"
              style="width: 18px; height: 18px; cursor: pointer"
          />
          <div style="flex: 1">
            <div style="font-weight: 500">📝 로그 기록</div>
            <div style="font-size: 12px; color: #666">주가 변동 이력을 기록합니다</div>
          </div>
        </label>
      </div>
    </div>

    <!-- 주가 변경 -->
    <div style="margin-bottom: 24px">
      <h3 style="margin-bottom: 12px; font-size: 16px">💰 주가 변경</h3>
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap">
        <input
            type="number"
            v-model.number="newPrice"
            min="0"
            step="10"
            style="padding: 10px; border: 1px solid #ddd; border-radius: 4px; width: 120px; font-size: 14px"
        />
        <button
            @click="updatePrice"
            style="padding: 10px 20px; background: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500"
        >
          📊 주가 설정
        </button>
        <button
            @click="randomPrice"
            style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500"
        >
          🎲 랜덤 변동
        </button>
        <button
            @click="clearLogs"
            v-if="logs.length > 0"
            style="padding: 10px 20px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500"
        >
          🗑️ 로그 초기화
        </button>
      </div>
    </div>

    <p style="color: #888; font-size: 12px; margin-bottom: 16px">
      💡 관찰자를 등록한 후 주가를 변경하면 자동으로 알림이 전송됩니다
    </p>

    <!-- 로그 표시 -->
    <div v-if="logs.length > 0" style="margin-top: 20px">
      <h3 style="margin-bottom: 12px; font-size: 16px">📋 이벤트 로그</h3>
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

    <div v-else style="margin-top: 20px; padding: 30px; background: #f9f9f9; border-radius: 6px; text-align: center; color: #999">
      📭 로그가 없습니다. 관찰자를 등록하고 주가를 변경해보세요!
    </div>

    <!-- 패턴 설명 -->
    <div style="margin-top: 30px; padding: 16px; background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px">
      <h4 style="margin: 0 0 8px 0; color: #1e40af; font-size: 14px">💡 패턴 설명</h4>
      <p style="margin: 0; color: #1e3a8a; font-size: 13px; line-height: 1.6">
        옵저버 패턴은 한 객체의 상태가 변경되면 그 객체에 의존하는 다른 객체들이 자동으로 통지받고 업데이트됩니다.
        이벤트 처리 시스템, 데이터 바인딩, MVC 패턴 등에서 널리 사용됩니다.
      </p>
    </div>
  </section>
</template>

<style scoped>
button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  transition: all 0.2s;
}

button:active {
  transform: translateY(0);
}

input[type="checkbox"] {
  accent-color: #42b883;
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
