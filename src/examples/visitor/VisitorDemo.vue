<script setup lang="ts">
import { ref } from 'vue'
import {
  FileElement,
  FolderElement,
  SizeCalculator,
  NamePrinter
} from '@/examples/visitor/Visitor'

// 샘플 파일 시스템 구조 생성
function createSampleFileSystem(): FolderElement {
  const root = new FolderElement('root')

  const documents = new FolderElement('documents')
  documents.children.push(new FileElement('resume.pdf', 250))
  documents.children.push(new FileElement('report.docx', 180))

  const images = new FolderElement('images')
  images.children.push(new FileElement('photo1.jpg', 1200))
  images.children.push(new FileElement('photo2.png', 2400))

  root.children.push(documents)
  root.children.push(images)
  root.children.push(new FileElement('config.json', 25))

  return root
}

const fileSystem = ref(createSampleFileSystem())
const logs = ref<string[]>([])
const totalSize = ref<number>(0)

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
  logs.value = tempLogs
}

function calculateSize() {
  const calculator = new SizeCalculator()
  fileSystem.value.accept(calculator)
  totalSize.value = calculator.getTotalSize()
  logs.value = [`총 크기: ${totalSize.value}KB`]
}

function printStructure() {
  captureConsoleLogs(() => {
    const printer = new NamePrinter()
    fileSystem.value.accept(printer)
  })
}

function clearLogs() {
  logs.value = []
  totalSize.value = 0
}
</script>

<template>
  <section style="padding: 20px; max-width: 700px">
    <h2>🚶 Visitor Pattern</h2>

    <p style="color: #666; font-size: 14px; margin-bottom: 20px">
      비지터 패턴을 사용하여 객체 구조를 변경하지 않고 새로운 연산을 추가합니다
    </p>

    <!-- 통계 표시 -->
    <div v-if="totalSize > 0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; color: white; margin-bottom: 20px; text-align: center">
      <div style="font-size: 14px; opacity: 0.9; margin-bottom: 4px">총 파일 크기</div>
      <div style="font-size: 36px; font-weight: bold">{{ totalSize }} KB</div>
    </div>

    <!-- 버튼들 -->
    <div style="display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap">
      <button
          @click="calculateSize"
          style="padding: 12px 20px; background: #42b883; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500"
      >
        💾 크기 계산
      </button>

      <button
          @click="printStructure"
          style="padding: 12px 20px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500"
      >
        📋 구조 출력
      </button>

      <button
          @click="clearLogs"
          v-if="logs.length > 0"
          style="padding: 12px 20px; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500"
      >
        🗑️ 초기화
      </button>
    </div>

    <p style="color: #888; font-size: 12px; margin-bottom: 16px">
      💡 각 버튼은 서로 다른 Visitor를 사용하여 파일 시스템을 탐색합니다
    </p>

    <!-- 로그 표시 -->
    <div v-if="logs.length > 0" style="margin-top: 20px">
      <h3 style="margin-bottom: 12px; font-size: 16px">📋 실행 로그</h3>
      <div style="background: #1e1e1e; border-radius: 6px; padding: 16px; font-family: 'Courier New', monospace">
        <div
            v-for="(log, index) in logs"
            :key="index"
            style="color: #a3e635; margin-bottom: 6px; font-size: 13px"
        >
          {{ log }}
        </div>
      </div>
    </div>

    <div v-else style="margin-top: 20px; padding: 30px; background: #f9f9f9; border-radius: 6px; text-align: center; color: #999">
      📭 로그가 없습니다. Visitor를 실행해보세요!
    </div>

    <!-- 파일 시스템 구조 -->
    <div style="margin-top: 30px; padding: 16px; background: #f8f9fa; border-radius: 6px">
      <h4 style="margin: 0 0 12px 0; font-size: 14px">📁 파일 시스템 구조</h4>
      <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.8">📁 root/
  📁 documents/
    📄 resume.pdf (250KB)
    📄 report.docx (180KB)
  📁 images/
    📄 photo1.jpg (1200KB)
    📄 photo2.png (2400KB)
  📄 config.json (25KB)</pre>
    </div>

    <!-- 패턴 설명 -->
    <div style="margin-top: 30px; padding: 16px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px">
      <h4 style="margin: 0 0 8px 0; color: #92400e; font-size: 14px">💡 패턴 설명</h4>
      <p style="margin: 0; color: #78350f; font-size: 13px; line-height: 1.6">
        비지터 패턴은 객체 구조와 수행할 연산을 분리합니다.
        새로운 연산을 추가할 때 기존 클래스를 수정하지 않고 새로운 Visitor만 추가하면 됩니다.
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
</style>
