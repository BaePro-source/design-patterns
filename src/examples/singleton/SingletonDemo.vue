<script setup lang="ts">
import { ref } from "vue";
import { Singleton } from "./Singleton";

// 두 인스턴스와 결과 저장용
const s1 = ref<Singleton | null>(null);
const s2 = ref<Singleton | null>(null);
const result = ref("");
const message = ref("");

// 인스턴스 생성 및 비교
function createInstances() {
  s1.value = Singleton.getInstance();
  s2.value = Singleton.getInstance();

  const same = s1.value === s2.value;
  result.value = same ? "✅ s1과 s2는 같은 인스턴스입니다!" : "❌ 다른 인스턴스입니다!";
  message.value = s1.value.sayHello();
}
</script>

<template>
  <section style="padding:20px">
    <h2>Singleton Pattern (Eager Initialization)</h2>

    <button @click="createInstances" style="margin:10px 0; padding:6px 12px;">인스턴스 생성 테스트</button>

    <div v-if="message">
      <p><strong>출력 메시지:</strong> {{ message }}</p>
      <p><strong>비교 결과:</strong> {{ result }}</p>
    </div>
  </section>
</template>
