<script setup lang="ts">
import { ref } from 'vue'
import type { OldPaymentProcessor } from '@/examples/adapter/Adapter'
import { NewPaymentGateway, PaymentAdapter } from '@/examples/adapter/Adapter'

const amount = ref<number>(5000)
const logs = ref<string[]>([])

function run() {
  // 1. 새 결제 게이트웨이 생성 (Adaptee)
  const newGateway = new NewPaymentGateway()

  // 2. 어댑터로 기존 인터페이스에 맞게 래핑
  const adapter: OldPaymentProcessor = new PaymentAdapter(newGateway)

  // 3. 클라이언트는 기존 인터페이스만 사용
  adapter.pay(amount.value)

  // 4. UI 로그 추가
  logs.value.unshift(`✅ ${amount.value}원 결제 완료 (어댑터 패턴 적용)`)
}

function clearLogs() {
  logs.value = []
}
</script>

<template>
  <section style="padding: 20px; max-width: 600px">
    <h2>🔌 Adapter Pattern </h2>

    <p style="color: #666; font-size: 14px; margin-bottom: 20px">
      어댑터 패턴을 사용하여 호환되지 않는 인터페이스를 연결합니다
    </p>

    <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 16px">
      <label>
        결제금액:
        <input
            type="number"
            v-model.number="amount"
            min="0"
            step="1000"
            style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 120px"
        />
      </label>
      <button
          @click="run"
          style="padding: 8px 16px; background: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer"
      >
        결제 요청
      </button>
      <button
          @click="clearLogs"
          v-if="logs.length > 0"
          style="padding: 8px 16px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer"
      >
        로그 초기화
      </button>
    </div>

    <p style="color: #888; font-size: 12px; margin-bottom: 16px">
      💡 브라우저 콘솔에서 상세 로그를 확인하세요
    </p>

    <div v-if="logs.length > 0" style="margin-top: 20px">
      <h3 style="margin-bottom: 12px; font-size: 16px">📋 실행 로그</h3>
      <ul style="list-style: none; padding: 0; margin: 0">
        <li
            v-for="(log, index) in logs"
            :key="index"
            style="padding: 10px; margin-bottom: 8px; background: #f5f5f5; border-radius: 4px; border-left: 3px solid #42b883"
        >
          {{ log }}
        </li>
      </ul>
    </div>

    <div v-else style="margin-top: 20px; padding: 20px; background: #f9f9f9; border-radius: 4px; text-align: center; color: #999">
      로그가 없습니다. 결제 요청을 실행해보세요!
    </div>
  </section>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}

button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  transition: all 0.2s;
}

button:active {
  transform: translateY(0);
}
</style>
