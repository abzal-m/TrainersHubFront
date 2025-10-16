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
      <Card v-if="todayTrainings && todayTrainings.title !== ''" class="border border-gray-100">
        <template #content>
          <div class="p-2">
            <div class="flex gap-6">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-4">
                  <div>
                    <h2 class="text-xl font-bold text-gray-900">Сегодняшняя тренировка</h2>
                    <p class="text-sm text-indigo-600">{{ todayTrainings.title }}</p>
                  </div>
                </div>

                <div class="grid grid-cols-3 gap-4 mb-3">
                  <div class="bg-gray-50 p-2 rounded-lg">
                    <div class="text-sm text-gray-500">Длительность</div>
                    <div class="text-lg font-semibold mt-1">{{ formatTotalDuration(todayTrainings.segments) }}</div>
                  </div>
                  <div class="bg-gray-50 p-2 rounded-lg">
                    <div class="text-sm text-gray-500">Дистанция</div>
                    <div class="text-lg font-semibold mt-1">{{ formatTotalDistance(todayTrainings.segments) }} км</div>
                  </div>
                  <div class="bg-gray-50 p-2 rounded-lg">
                    <div class="text-sm text-gray-500">Начало</div>
                    <div class="text-lg font-semibold mt-1">{{ formatTime(todayTrainings.trainingDay) }}</div>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-6 mb-3">
                  <Button @click="openDialog(todayTrainings, 'bottom')" label="Детали" icon="pi pi-caret-right"
                          class="w-5 p-button-primary text-white shadow-sm"/>
                  <Button @click="openPosition('bottom')" label="Загрузить" icon="pi pi-upload"
                          class="w-5 p-button-success text-white shadow-sm"/>
                </div>

              </div>
            </div>
          </div>
        </template>
      </Card>


      <Card class="border border-gray-100">
        <template #content>
          <div class="p-2">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Предстоящие тренировки</h2>
            <div class="divide-y divide-gray-100">
              <div v-for="tr in futureTrainings" :key="tr.trainingId"
                   class="flex items-center gap-4 hover:bg-gray-50 transition-all cursor-pointer group">
                <div class="flex-1 mb-4" @click.native="openDialog(tr, 'left')">
                  <div class="font-semibold text-gray-900">{{ tr.title }}</div>
                  <div class="text-sm text-gray-500 mt-1">
                    {{ formatDateShort(tr.trainingDay) }} • {{ formatTotalDuration(tr.segments) }}
                  </div>
                </div>

                <i class="pi pi-chevron-right text-gray-300 group-hover:text-indigo-600 transition-colors"></i>

              </div>

              <div v-if="!futureTrainings.length" class="p-6 text-center text-gray-500">
                Нет предстоящих тренировок
              </div>
            </div>
          </div>
        </template>
      </Card>
    </main>
    <CustomDialog v-model="visible" :training="modalTrainings" :position="position"/>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import Card from "primevue/card";
import Button from 'primevue/button';
import {api} from "@/api";
import type {Segment, Trainings} from "@/model/types";
import {formatDateShort, formatTime, formatTotalDistance, formatTotalDuration} from "@/utils/formatters";
import CustomDialog from './tiny/CustomDialog.vue';

const name = sessionStorage.getItem("Name") || 'Athlete';
const position = ref('center');
const visible = ref(false);

const openPosition = (pos: string) => {
  position.value = pos;
  visible.value = true;
}
const todayTrainings = ref<Trainings>();
const modalTrainings = ref<Trainings>();
const futureTrainings = ref<Trainings[]>([]);
const today = new Date();

const localeDateString = today.toLocaleDateString('ru-RU', {weekday: 'long', day: 'numeric', month: 'long'});
const openDialog = (train: Trainings, position: string) => {
  modalTrainings.value = train;
  openPosition(position)
}

const getTrainings = async () => {
  try {
    const res = await api.getAthleteTrainings();
    todayTrainings.value = res.todayTraining;
    futureTrainings.value = Array.isArray(res.futureTraining) ? res.futureTraining : [];
  } catch (e) {
    futureTrainings.value = [];
    console.error(e);
  }
};
onMounted(() => {
  getTrainings();
});


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