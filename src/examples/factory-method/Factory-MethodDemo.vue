<script setup lang="ts">
import { ref } from 'vue'
import { createDialog, type Dialog } from './Factory-Method'

const selectedOS = ref('Windows')
const result = ref<{ render: string; click: string } | null>(null)
const logs = ref<string[]>([])

function runFactory() {
  // 선택된 OS에 따라 Dialog 생성
  const dialog: Dialog = createDialog(selectedOS.value)

  // Dialog 실행
  result.value = dialog.renderDialog()

  // 로그 추가
  const timestamp = new Date().toLocaleTimeString()
  logs.value.unshift(`[${timestamp}] ${selectedOS.value} Dialog 생성 및 실행`)

  // 최대 5개까지만 로그 유지
  if (logs.value.length > 5) {
    logs.value.pop()
  }
}

function clearLogs() {
  logs.value = []
  result.value = null
}
</script>

<template>
  <div class="factory-demo">
    <h2>🏭 Factory Method Pattern</h2>

    <div class="description">
      <p>
        <strong>팩토리 메서드 패턴</strong>은 객체 생성 로직을 서브클래스로 위임하는 생성 패턴입니다.
      </p>
      <p>
        OS에 따라 다른 버튼 스타일을 생성하는 Dialog 예제입니다.
      </p>
    </div>

    <div class="control-panel">
      <div class="os-selector">
        <label>운영체제 선택:</label>
        <select v-model="selectedOS">
          <option value="Windows">🪟 Windows</option>
          <option value="Mac">🍎 macOS</option>
          <option value="Linux">🐧 Linux</option>
        </select>
      </div>

      <div class="button-group">
        <button @click="runFactory" class="btn-primary">
          Dialog 생성 및 실행
        </button>
        <button @click="clearLogs" class="btn-secondary">
          초기화
        </button>
      </div>
    </div>

    <div v-if="result" class="result-box">
      <h3>실행 결과</h3>
      <div class="result-item">
        <span class="label">Render:</span>
        <span class="value">{{ result.render }}</span>
      </div>
      <div class="result-item">
        <span class="label">Click:</span>
        <span class="value">{{ result.click }}</span>
      </div>
    </div>

    <div v-if="logs.length > 0" class="logs-box">
      <h3>실행 로그</h3>
      <ul>
        <li v-for="(log, index) in logs" :key="index">{{ log }}</li>
      </ul>
    </div>

    <div class="explanation">
      <h3>💡 패턴 구조</h3>
      <ul>
        <li><strong>Button (Product):</strong> 공통 인터페이스</li>
        <li><strong>WindowsButton, MacButton (Concrete Products):</strong> 구체적인 구현</li>
        <li><strong>Dialog (Creator):</strong> 팩토리 메서드를 정의하는 추상 클래스</li>
        <li><strong>WindowsDialog, MacDialog (Concrete Creators):</strong> 실제 객체를 생성</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.factory-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  color: #2c3e50;
  border-bottom: 3px solid #42b983;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

h3 {
  color: #35495e;
  margin-top: 25px;
  margin-bottom: 15px;
}

.description {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
  border-left: 4px solid #42b983;
}

.description p {
  margin: 8px 0;
  line-height: 1.6;
  color: #555;
}

.control-panel {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.os-selector {
  margin-bottom: 20px;
}

.os-selector label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
}

.os-selector select {
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s;
}

.os-selector select:hover {
  border-color: #42b983;
}

.os-selector select:focus {
  outline: none;
  border-color: #42b983;
}

.button-group {
  display: flex;
  gap: 10px;
}

.btn-primary,
.btn-secondary {
  flex: 1;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #42b983;
  color: white;
}

.btn-primary:hover {
  background: #359268;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.3);
}

.btn-secondary {
  background: #e9ecef;
  color: #495057;
}

.btn-secondary:hover {
  background: #dee2e6;
  transform: translateY(-2px);
}

.result-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.result-box h3 {
  color: white;
  margin-top: 0;
}

.result-item {
  display: flex;
  align-items: center;
  margin: 12px 0;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}

.result-item .label {
  font-weight: 600;
  min-width: 80px;
  margin-right: 15px;
}

.result-item .value {
  font-size: 18px;
}

.logs-box {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  font-family: 'Courier New', monospace;
}

.logs-box h3 {
  color: #42b983;
  margin-top: 0;
}

.logs-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.logs-box li {
  padding: 8px 12px;
  margin: 5px 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  border-left: 3px solid #42b983;
  font-size: 14px;
}

.explanation {
  background: #fff3cd;
  padding: 20px;
  border-radius: 8px;
  margin-top: 25px;
  border-left: 4px solid #ffc107;
}

.explanation ul {
  margin: 10px 0;
  padding-left: 20px;
}

.explanation li {
  margin: 8px 0;
  line-height: 1.6;
  color: #856404;
}

.explanation strong {
  color: #664d03;
}
</style>