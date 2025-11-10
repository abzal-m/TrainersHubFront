<template>
  <Dialog
      :visible="modelValue"
      @update:visible="$emit('update:modelValue', $event)"
      modal
      :header="trainingResults?.title"
      :style="{ width: '25rem', height: '100vh' }"
      :position="position"
      :draggable="false"
  >
    <h2 class="text-lg font-semibold">
      {{ props.trainingResults?.username }}
    </h2>
    <div>
      Завершено: {{ formatDateShort(props.trainingResults?.createdAt) }} •
      {{ formatTime(props.trainingResults?.createdAt) }}
    </div>
    <div class="p-2">
      <h2 class="flex items-center gap-2 text-lg font-semibold mb-3">
        <i class="pi pi-chart-bar text-sky-500"></i>
        Общие данные
      </h2>

      <div class="grid grid-cols-2 gap-3">
        <Card
            v-for="(metric, i) in basics"
            :key="i"
            class="h-5rem w-10rem flex flex-col justify-center"
        >
          <template #content>
            <div class="flex flex-col items-start justify-center h-full">
              <p class="text-sm text-gray-400">{{ metric.label }}</p>
              <p class="text-base font-medium text-gray-700">
                {{ metric.value }}
              </p>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <div class="p-2">
      <h2 class="flex items-center gap-2 text-lg font-semibold mb-3">
        <i class="pi pi-heart text-sky-500"></i>
        Метрики тренировки
      </h2>

      <div class="grid grid-cols-2 gap-3">
        <Card
            v-for="(metric, i) in metrics"
            :key="i"
            class="h-5rem w-10rem flex flex-col justify-center"
        >
          <template #content>
            <div class="flex flex-col items-start justify-center h-full">
              <p class="text-sm text-gray-400">{{ metric.label }}</p>
              <p class="text-base font-medium text-gray-700">
                {{ metric.value }}
              </p>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <div>
      <p class="gap-2 text-lg font-semibold mb-3">
        <i class="pi pi-thumbs-up text-sky-500"></i>
        Оценка тренера
      </p>
    </div>
    <div>
      <p>Оценка тренировки</p>
      <div class="card py-3">
        <Rating v-model="rating"/>
      </div>
    </div>
    <div >
      <p>Комментарий</p>
      <Textarea v-model="comments" rows="5" cols="40" />
      <div class="flex justify-around gap-2 text-gray-500">
        <Button label="Сохранить отзыв" />
        <Button label="Закрыть" />
      </div>
    </div>


  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import {dateFormatter, formatDateShort, formatSeconds, formatTime, localeDateString} from "@/utils/formatters";
import {computed, ref} from "vue";

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

const props = defineProps<{
  modelValue: boolean;
  position?: string;
  trainingResults?: {
    avgHeartRate?: number
    durationMinutes?: number
    avgCadence?: number
    elevationGain?: number,
    title?: string,
    username?: string,
    rpe?: number,
    wellbeing?: string,
    athleteNotion: string
    createdAt?: string
  }
}>()

const rating = ref(0)
const comments = ref('')

const basics = computed(() => [
  {label: 'Время', value:`${dateFormatter(props.trainingResults?.createdAt) ?? 0} `},
  {label: 'RPE', value: `${props.trainingResults?.rpe ?? 0} `},
  {label: 'Самочувствие', value: `${props.trainingResults?.wellbeing ?? 0} `},
  {label: 'Калории', value: `нет данных`},
])

const metrics = computed(() => [
  {label: 'Средний пульс', value: `${props.trainingResults?.avgHeartRate ?? 0} уд/мин`},
  {label: 'Длительность тренировки', value: formatSeconds(props.trainingResults?.durationMinutes ?? 0)},
  {label: 'Средний каденс', value: `${props.trainingResults?.avgCadence ?? 0} об/мин`},
  {label: 'Подъём', value: `${props.trainingResults?.elevationGain ?? 0} м`},
])


</script>