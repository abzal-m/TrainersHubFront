<template>
  <div>
    <div class=" flex flex-row items-center justify-between">
      <Card class="rounded-xl shadow-lg" style="width: 45%">
        <template #title>
          {{ athletes.length }}
        </template>
        <template #content>
          Активных атлетов
        </template>
      </Card>
      <Card class="rounded-xl shadow-lg" style="width: 45%">
        <template #title>
          87%
        </template>
        <template #content>
          Среднее выполнение
        </template>
      </Card>
    </div>
    <Card>
      <template #title>Быстрые действия</template>
      <template #footer>
        <div class="flex gap-4 mt-1">
          <Button label="Новая тренировка" class="w-full text-sm" icon="pi pi-plus"/>
          <Button label="Отправить сообщение" severity="secondary" variant="outlined" icon="pi pi-whatsapp"
                  class="w-full"/>
        </div>
      </template>
    </Card>
    <Card class="mt-4">
      <template #title>Тренировки сегодня</template>

      <template #content>
        <div v-if="allTrainings.length">
          <div
              v-for="tr in allTrainings"
              :key="tr.trainingId"
              @click="openDialog(tr, 'left')"
              class="flex items-center justify-between py-3 hover:bg-gray-50 transition cursor-pointer"
          >
            <div class="flex flex-col">
              <div class="font-semibold text-gray-900 text-lg">
                {{ tr.athleteName }}
              </div>
              <div class="text-sm text-gray-500">
                {{ tr.title }}
              </div>
            </div>

            <div class="flex items-center space-x-1 text-gray-500 text-sm">
              <span>{{ formatTime(tr.trainingDay) }}</span>
              <i class="pi pi-chevron-right text-gray-300"></i>
            </div>
          </div>
        </div>

        <div v-else class="p-6 text-center text-gray-400">
          Нет предстоящих тренировок
        </div>
      </template>

    </Card>
    <Card class="mt-4">
      <template #title>Последние активности</template>
      <template #content>
        <div v-for="results in allTrainingResults">
          <Card class="hover:shadow-lg transition-shadow duration-300 cursor-pointer" @click="openTrainingsResults(results.trainingId)">
            <template #content>
              <div class="flex items-center justify-between p-2">
                <div class="flex flex-col gap-1">
                  <h3 class="font-semibold text-gray-900 text-base">{{ results.username }}</h3>
                  <p class="text-sm text-gray-600">{{ results.title }}</p>
                  <p class="text-xs text-gray-400">
                    {{ formatDateShort(results.createdAt) }} • {{ formatTime(results.createdAt) }}
                  </p>
                </div>

                <div class="flex items-center gap-2 text-gray-500">
                  <span class="text-sm font-medium">{{ formatSeconds(results.durationMinutes) }}</span>
                  <i class="pi pi-chevron-right text-gray-300"></i>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </template>

    </Card>
  </div>
  <CustomDialog v-model="visible" :training="modalTrainings" :position="position"/>
  <TrainingResultsDialog v-model="visibleResults" :trainingResults="trainingResults" :position="'center'"/>
</template>

<script setup lang="ts">

import {AllTrainingResults, MyAthlete, Trainings} from "@/model/types";
import {onMounted, ref, watchEffect} from 'vue';
import {api} from "@/api";
import {formatDateShort, formatSeconds, formatTime, formatTotalDuration} from "@/utils/formatters";
import Card from "primevue/card";
import CustomDialog from "@/components/tiny/CustomDialog.vue";

const props = defineProps(
    ['athletes']
)
const athletes = ref<MyAthlete[]>([])
const allTrainings = ref<Trainings[]>([])
const allTrainingResults = ref<AllTrainingResults[]>([])
const position = ref('center');
const visible = ref(false);
const visibleResults = ref(false)
const modalTrainings = ref<Trainings>();
const trainingResults = ref<AllTrainingResults>();
const openDialog = (train: Trainings, pos: string) => {
  modalTrainings.value = train;
  position.value = pos;
  visible.value = true;
}
const openTrainingsResults = (trainingId: number) => {
  console.log('click')
  trainingResults.value = allTrainingResults.value.find((x) => x.trainingId === trainingId)
  visibleResults.value = true;
}
watchEffect(() => {
  athletes.value = props.athletes
})
onMounted(async () => {
  allTrainings.value = await api.getAllAthleteTrainings()
  allTrainingResults.value = await api.getMyAthletesResults()
  console.log(allTrainingResults.value, 'value')
})

</script>

<style scoped>

</style>