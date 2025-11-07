<script setup lang="ts">
import { ref } from 'vue'
import type { Notifier } from '@/examples/decorator/Decorator'
import {
  BaseNotifier,
  EmailNotifier,
  SMSNotifier,
  SlackNotifier
} from '@/examples/decorator/Decorator'

const message = ref<string>('긴급 서버 장애 발생!')
const logs = ref<string[]>([])
const selectedChannels = ref<string[]>(['base'])

const channels = [
  { id: 'base', label: '기본 알림', icon: '📢' },
  { id: 'email', label: '이메일', icon: '📧' },
  { id: 'sms', label: 'SMS', icon: '📱' },
  { id: 'slack', label: 'Slack', icon: '💬' }
]

function sendNotification() {
  logs.value = []

  // 기본 알림부터 시작
  let notifier: Notifier = new BaseNotifier()

  // 선택된 채널에 따라 데코레이터를 동적으로 조합
  if (selectedChannels.value.includes('email')) {
    notifier = new EmailNotifier(notifier)
  }
  if (selectedChannels.value.includes('sms')) {
    notifier = new SMSNotifier(notifier)
  }
  if (selectedChannels.value.includes('slack')) {
    notifier = new SlackNotifier(notifier)
  }

  // 콘솔 로그를 가로채서 UI에 표시
  const originalLog = console.log
  console.log = (...args: any[]) => {
    logs.value.push(args.join(' '))
    originalLog.apply(console, args)
  }

  // 알림 발송
  notifier.send(message.value)

  // console.log 복원
  console.log = originalLog
}

function clearLogs() {
  logs.value = []
}
</script>

<template>
  <section style="padding: 20px; max-width: 700px">
    <h2>🎨 Decorator Pattern</h2>

    <p style="color: #666; font-size: 14px; margin-bottom: 20px">
      데코레이터 패턴을 사용하여 런타임에 기능을 동적으로 추가합니다
    </p>

    <div style="margin-bottom: 20px">
      <label style="display: block; margin-bottom: 8px; font-weight: 500">
        알림 메시지:
      </label>
      <input
          type="text"
          v-model="message"
          placeholder="알림 메시지를 입력하세요"
          style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px"
      />
    </div>

    <div style="margin-bottom: 20px">
      <label style="display: block; margin-bottom: 8px; font-weight: 500">
        알림 채널 선택:
      </label>
      <div style="display: flex; flex-wrap: wrap; gap: 12px">
        <label
            v-for="channel in channels"
            :key="channel.id"
            style="display: flex; align-items: center; gap: 6px; cursor: pointer; padding: 8px 12px; border: 2px solid #ddd; border-radius: 6px; transition: all 0.2s"
            :style="{
            borderColor: selectedChannels.includes(channel.id) ? '#42b883' : '#ddd',
            background: selectedChannels.includes(channel.id) ? '#f0fdf4' : 'white'
          }"
        >
          <input
              type="checkbox"
              :value="channel.id"
              v-model="selectedChannels"
              :disabled="channel.id === 'base'"
              style="cursor: pointer"
          />
          <span>{{ channel.icon }} {{ channel.label }}</span>
        </label>
      </div>
      <p style="color: #999; font-size: 12px; margin-top: 8px">
        ℹ️ 기본 알림은 항상 포함됩니다
      </p>
    </div>

    <div style="display: flex; gap: 8px; margin-bottom: 16px">
      <button
          @click="sendNotification"
          style="padding: 10px 20px; background: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500"
      >
        📤 알림 발송
      </button>
      <button
          @click="clearLogs"
          v-if="logs.length > 0"
          style="padding: 10px 20px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500"
      >
        🗑️ 로그 초기화
      </button>
    </div>

    <p style="color: #888; font-size: 12px; margin-bottom: 16px">
      💡 브라우저 콘솔에서도 로그를 확인할 수 있습니다
    </p>

    <div v-if="logs.length > 0" style="margin-top: 20px">
      <h3 style="margin-bottom: 12px; font-size: 16px">📋 발송 로그</h3>
      <div style="background: #1e1e1e; border-radius: 6px; padding: 16px; font-family: 'Courier New', monospace">
        <div
            v-for="(log, index) in logs"
            :key="index"
            style="color: #a3e635; margin-bottom: 8px; font-size: 13px"
        >
          {{ log }}
        </div>
      </div>
    </div>

    <div v-else style="margin-top: 20px; padding: 30px; background: #f9f9f9; border-radius: 6px; text-align: center; color: #999">
      📭 로그가 없습니다. 알림을 발송해보세요!
    </div>

    <div style="margin-top: 30px; padding: 16px; background: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 4px">
      <h4 style="margin: 0 0 8px 0; color: #92400e; font-size: 14px">💡 패턴 설명</h4>
      <p style="margin: 0; color: #78350f; font-size: 13px; line-height: 1.6">
        데코레이터 패턴은 객체에 동적으로 새로운 기능을 추가할 수 있게 해줍니다.
        상속 대신 구성(composition)을 사용하여 런타임에 유연하게 기능을 조합할 수 있습니다.
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
  width: 16px;
  height: 16px;
}
</style>
