<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ComputerBuilder, ComputerDirector, type Computer } from '@/examples2/builder/Builder'

const builder = new ComputerBuilder()
const director = new ComputerDirector(builder)

const selectedPreset = ref<'gaming' | 'office' | 'workstation'>('gaming')
const builtComputer = ref<Computer | null>(null)
const allComputers = ref<{ name: string; computer: Computer }[]>([])

const customSpecs = reactive({
  cpu: '기본 CPU',
  ram: '기본 RAM',
  ssd: '기본 SSD',
  gpu: '기본 GPU',
  motherboard: '기본 마더보드',
  powerSupply: '기본 파워'
})

const presets = [
  { id: 'gaming', label: '🎮 게이밍 PC', emoji: '🎮' },
  { id: 'office', label: '💼 오피스 PC', emoji: '💼' },
  { id: 'workstation', label: '🖥️ 워크스테이션', emoji: '🖥️' }
]

const cpuOptions = ['Intel i9-13900K', 'Intel i5-13400', 'AMD Ryzen 9 7950X', 'AMD Ryzen 5 5600X']
const ramOptions = ['DDR4 8GB', 'DDR4 16GB', 'DDR5 32GB', 'DDR5 64GB', 'DDR5 128GB']
const ssdOptions = ['SATA 256GB', 'SATA 512GB', 'NVMe 512GB', 'NVMe 1TB', 'NVMe 2TB']
const gpuOptions = ['Integrated Graphics', 'RTX 3060', 'RTX 4070', 'RTX 4090', 'RTX 6000 Ada']
const motherboardOptions = ['ASUS Prime', 'ASUS ROG', 'MSI MPG', 'ASUS ProArt']
const powerSupplyOptions = ['400W Bronze', '550W Gold', '750W Gold', '1000W Gold', '1600W Platinum']

function buildPresetPC(): void {
  if (selectedPreset.value === 'gaming') {
    builtComputer.value = director.buildGamingPC()
  } else if (selectedPreset.value === 'office') {
    builtComputer.value = director.buildOfficePC()
  } else if (selectedPreset.value === 'workstation') {
    builtComputer.value = director.buildWorkstationPC()
  }

  if (builtComputer.value) {
    allComputers.value.push({
      name: `${selectedPreset.value.toUpperCase()} PC`,
      computer: { ...builtComputer.value }
    })
  }
}

function buildCustomPC(): void {
  builtComputer.value = builder
      .reset()
      .setCPU(customSpecs.cpu)
      .setRAM(customSpecs.ram)
      .setSSD(customSpecs.ssd)
      .setGPU(customSpecs.gpu)
      .setMotherboard(customSpecs.motherboard)
      .setPowerSupply(customSpecs.powerSupply)
      .build()

  allComputers.value.push({
    name: `커스텀 PC #${allComputers.value.length + 1}`,
    computer: { ...builtComputer.value }
  })
}

function resetCustom(): void {
  customSpecs.cpu = '기본 CPU'
  customSpecs.ram = '기본 RAM'
  customSpecs.ssd = '기본 SSD'
  customSpecs.gpu = '기본 GPU'
  customSpecs.motherboard = '기본 마더보드'
  customSpecs.powerSupply = '기본 파워'
  builtComputer.value = null
}

function clearAll(): void {
  allComputers.value = []
  builtComputer.value = null
  resetCustom()
}
</script>

<template>
  <section style="padding: 20px; max-width: 1000px">
    <h2>🔨 Builder Pattern</h2>

    <p style="color: #666; font-size: 14px; margin-bottom: 24px">
      빌더 패턴을 사용하여 복잡한 컴퓨터 설정을 단계별로 구성합니다
    </p>

    <!-- 두 가지 빌드 방식 -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px">
      <!-- 1. 프리셋 빌드 -->
      <div style="padding: 20px; border: 2px solid #42b883; border-radius: 8px">
        <h3 style="margin-top: 0; color: #42b883">⚡ 빠른 빌드 (프리셋)</h3>

        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px">
          <label
              v-for="preset in presets"
              :key="preset.id"
              style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 2px solid #ddd; border-radius: 6px; cursor: pointer; transition: all 0.2s"
              :style="{
              borderColor: selectedPreset === preset.id ? '#42b883' : '#ddd',
              background: selectedPreset === preset.id ? '#f0fdf4' : 'white'
            }"
          >
            <input
                type="radio"
                :value="preset.id"
                v-model="selectedPreset"
                style="width: 18px; height: 18px; cursor: pointer"
            />
            <span style="font-weight: 500">{{ preset.emoji }} {{ preset.label }}</span>
          </label>
        </div>

        <button
            @click="buildPresetPC"
            style="width: 100%; padding: 12px; background: #42b883; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 14px"
        >
          🏗️ 빌드 완료
        </button>
      </div>

      <!-- 2. 커스텀 빌드 -->
      <div style="padding: 20px; border: 2px solid #3498db; border-radius: 8px">
        <h3 style="margin-top: 0; color: #3498db">🎨 커스텀 빌드</h3>

        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; font-size: 13px">
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500">CPU</label>
            <select
                v-model="customSpecs.cpu"
                style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px"
            >
              <option v-for="cpu in cpuOptions" :key="cpu" :value="cpu">{{ cpu }}</option>
            </select>
          </div>

          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500">RAM</label>
            <select
                v-model="customSpecs.ram"
                style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px"
            >
              <option v-for="ram in ramOptions" :key="ram" :value="ram">{{ ram }}</option>
            </select>
          </div>

          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500">SSD</label>
            <select
                v-model="customSpecs.ssd"
                style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px"
            >
              <option v-for="ssd in ssdOptions" :key="ssd" :value="ssd">{{ ssd }}</option>
            </select>
          </div>

          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500">GPU</label>
            <select
                v-model="customSpecs.gpu"
                style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px"
            >
              <option v-for="gpu in gpuOptions" :key="gpu" :value="gpu">{{ gpu }}</option>
            </select>
          </div>

          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500">마더보드</label>
            <select
                v-model="customSpecs.motherboard"
                style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px"
            >
              <option v-for="mb in motherboardOptions" :key="mb" :value="mb">{{ mb }}</option>
            </select>
          </div>

          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500">파워서플라이</label>
            <select
                v-model="customSpecs.powerSupply"
                style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px"
            >
              <option v-for="ps in powerSupplyOptions" :key="ps" :value="ps">{{ ps }}</option>
            </select>
          </div>
        </div>

        <div style="display: flex; gap: 8px">
          <button
              @click="buildCustomPC"
              style="flex: 1; padding: 12px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 14px"
          >
            🏗️ 빌드 완료
          </button>
          <button
              @click="resetCustom"
              style="flex: 1; padding: 12px; background: #95a5a6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 14px"
          >
            🔄 초기화
          </button>
        </div>
      </div>
    </div>

    <!-- 빌드된 PC 목록 -->
    <div v-if="allComputers.length > 0">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px">
        <h3 style="margin: 0">📦 빌드된 컴퓨터 ({{ allComputers.length }}개)</h3>
        <button
            @click="clearAll"
            style="padding: 8px 16px; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 12px"
        >
          🗑️ 모두 삭제
        </button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px">
        <div
            v-for="(item, index) in allComputers"
            :key="index"
            style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; background: #f9f9f9"
        >
          <div style="font-weight: 600; margin-bottom: 12px; color: #42b883">{{ item.name }}</div>

          <div style="font-size: 12px; line-height: 1.8; color: #555">
            <div>💻 CPU: {{ item.computer.cpu }}</div>
            <div>🧠 RAM: {{ item.computer.ram }}</div>
            <div>💾 SSD: {{ item.computer.ssd }}</div>
            <div>🎮 GPU: {{ item.computer.gpu }}</div>
            <div>🔌 마더보드: {{ item.computer.motherboard }}</div>
            <div>⚡ 파워: {{ item.computer.powerSupply }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-else style="margin-top: 30px; padding: 40px; background: #f9f9f9; border-radius: 6px; text-align: center; color: #999">
      📭 아직 빌드된 컴퓨터가 없습니다. 위에서 빌드를 시작해보세요!
    </div>

    <!-- 패턴 설명 -->
    <div style="margin-top: 30px; padding: 16px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px">
      <h4 style="margin: 0 0 8px 0; color: #92400e; font-size: 14px">💡 패턴 설명</h4>
      <p style="margin: 0; color: #78350f; font-size: 13px; line-height: 1.6">
        빌더 패턴은 복잡한 객체를 단계별로 구성할 수 있게 해줍니다.
        메서드 체이닝을 사용하여 읽기 쉬운 코드를 작성하고, Director를 통해 미리 정의된 조합을 제공합니다.
        생성 로직을 표현 로직과 분리하여 유연성과 가독성을 높입니다.
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

select {
  font-family: inherit;
}
</style>
