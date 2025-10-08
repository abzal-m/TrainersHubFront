<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <!-- Header -->
    <div class="max-w-4xl mx-auto mb-2">
      <div class="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{{ name || 'Атлет' }}</h1>
          <p class="text-sm text-gray-500 mt-1">{{ localeDateString }}</p>
        </div>
      </div>
    </div>

    <main class="max-w-4xl mx-auto space-y-3">
      <!-- Today's workout -->
      <Card v-if="todayWorkout" class="border border-gray-100">
        <template #content>
          <div class="p-2">
            <div class="flex gap-6">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-4">
                  <div>
                    <h2 class="text-xl font-bold text-gray-900">Сегодняшняя тренировка</h2>
                    <p class="text-sm text-indigo-600">{{ todayWorkout.title }}</p>
                  </div>
                </div>

                <div class="grid grid-cols-3 gap-4 mb-3">
                  <div class="bg-gray-50 p-2 rounded-lg">
                    <div class="text-sm text-gray-500">Длительность</div>
                    <div class="text-lg font-semibold mt-1">{{ formatTotalDuration(todayWorkout.segments) }}</div>
                  </div>
                  <div class="bg-gray-50 p-2 rounded-lg">
                    <div class="text-sm text-gray-500">Дистанция</div>
                    <div class="text-lg font-semibold mt-1">{{ formatTotalDistance(todayWorkout.segments) }} км</div>
                  </div>
                  <div class="bg-gray-50 p-2 rounded-lg">
                    <div class="text-sm text-gray-500">Начало</div>
                    <div class="text-lg font-semibold mt-1">{{ formatTime(todayWorkout.trainingDay) }}</div>
                  </div>
                </div>

                <Button label="Детали" icon="pi pi-caret-right" class="w-full p-button-primary text-white shadow-sm"/>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- Upcoming workouts -->
      <Card class="border border-gray-100">
        <template #content>
          <div class="p-2">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Предстоящие тренировки</h2>
            <div class="divide-y divide-gray-100">
              <div v-for="tr in upcomingTrainings" :key="tr.trainingId"
                   class="flex items-center gap-4 hover:bg-gray-50 transition-all cursor-pointer group">
                <div class="flex-1 mb-4">
                  <div class="font-semibold text-gray-900">{{ tr.title }}</div>
                  <div class="text-sm text-gray-500 mt-1">
                    {{ formatDateShort(tr.trainingDay) }} • {{ formatTotalDuration(tr.segments) }}
                  </div>
                </div>

                <i class="pi pi-chevron-right text-gray-300 group-hover:text-indigo-600 transition-colors"></i>
              </div>

              <div v-if="!upcomingTrainings.length" class="p-6 text-center text-gray-500">
                Нет предстоящих тренировок
              </div>
            </div>
          </div>
        </template>
      </Card>
    </main>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import Card from "primevue/card";
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import {api} from "@/api";
import type {Trainings} from "@/model/types";
import {log} from 'console';

const name = sessionStorage.getItem("Name") || 'Алексей';
const trainings = ref<Trainings[]>([]);
const today = new Date();
const localeDateString = today.toLocaleDateString('ru-RU', {weekday: 'long', day: 'numeric', month: 'long'});

const getTrainings = async () => {
  try {
    const res = await api.getAthleteTrainings();
    trainings.value = Array.isArray(res) ? res : [];
  } catch (e) {
    trainings.value = [];
    console.error(e);
  }
};
onMounted(() => {
  getTrainings();
});

// Типы для локальной работы
interface Segment {
  order: number;
  targetHeartRate: number;
  targetCadence: number;
  durationMinutes: number;
  distanceKm: number;
}

interface Training {
  trainingId: number;
  title: string;
  description: string;
  trainingDay: string;
  trainerName?: string;
  segments: Segment[];
}

// Привести тренировки к типу и отсортировать по дате (ближайшие первые)
const sortedTrainings = computed<Training[]>(() => {
  return trainings.value
      .map((t: any) => ({...(t as any)}))
      .sort((a: any, b: any) => new Date(a.trainingDay).getTime() - new Date(b.trainingDay).getTime());
});

// todayWorkout: ближайшая тренировка (первый элемент в отсортированном списке)
const todayWorkout = computed<Training | null>(() => {
  return sortedTrainings.value.length ? sortedTrainings.value[0] as Training : null;
});

// upcoming: остальные
const upcomingTrainings = computed<Training[]>(() => {
  if (!sortedTrainings.value.length) return [];
  return sortedTrainings.value.slice(1);
});

// форматтеры
const formatTotalDistance = (segments: Segment[] = []) => {
  const dist = segments.reduce((s, seg) => s + (seg.distanceKm || 0), 0);
  return Math.round(dist * 10) / 10;
};
const formatTotalDuration = (segments: Segment[] = []) => {
  const total = segments.reduce((s, seg) => s + (seg.durationMinutes || 0), 0);
  const hours = Math.floor(total / 60);
  const mins = total % 60;
  return hours ? `${hours} ч ${mins} мин` : `${mins} мин`;
};
const formatDateShort = (d?: string) => {
  if (!d) return '';
  return new Date(d).toLocaleString('ru-RU', {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'});
};
// Add new formatter for time only
const formatTime = (d?: string) => {
  if (!d) return '';
  return new Date(d).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<style>
:deep(.p-card) {
  border-radius: 1rem;
  background: white;
}

:deep(.p-button-primary) {
  background: #4f46e5;
  border-color: #4f46e5;
}

:deep(.p-button-primary:hover) {
  background: #4338ca;
  border-color: #4338ca;
}
</style>