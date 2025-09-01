<script setup lang="ts">
import { ref, onMounted } from "vue";
const API_URL = import.meta.env.VITE_API_URL;
const data = ref();
onMounted(async () => {
  const res1 = await fetch(`${API_URL}/api/StravaActivity`);
  data.value = await res1.json();
});
</script>

<template>
  <div class="p-4">
    <!-- Пока данные загружаются -->
    <div v-if="!data">Загружаю данные...</div>

    <!-- Когда данные загружены -->
    <div v-else>
      <h2 class="text-xl font-bold mb-4">Список активностей Strava</h2>
      <ul class="space-y-2">
        <li
          v-for="activity in data"
          :key="activity.id"
          class="p-3 rounded-lg shadow bg-gray-100 hover:bg-gray-200 transition"
        >
          <div class="text-sm text-gray-600">
            {{ activity.sport_type }} Дистанция: {{ activity.distance }} м
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
