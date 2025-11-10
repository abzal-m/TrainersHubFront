<template>
  <Toast/>
  <ConfirmDialog/>

  <Dialog
      :visible="modelValue"
      @update:visible="emit('update:modelValue', $event)"
      modal
      header="Выберите тренировку для загрузки"
      :style="{ width: '25rem' }"
      :position="position"
      :draggable="false"
  >
    <div class="space-y-4">
      <div>
        <div class="text-md text-gray-700 font-semibold">
          {{ training?.title }}
        </div>
        <div class="text-sm text-gray-500">
          {{ training?.description }}
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <p>Последние тренировки</p>
        <div
            v-for="activity in activities"
            :key="activity.name"
            class="flex items-center gap-2"
        >
          <RadioButton
              v-model="selectedActivity"
              :inputId="activity.name"
              name="activity"
              :value="activity"
          />

          <label :for="activity.name" class="cursor-pointer">
            {{ dateFormatter(activity.start_date_local) }} |
            {{ activity.name }} – {{ activity.distance }} м
          </label>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="font-medium text-gray-700">RPE (восприятие нагрузки)</label>
          <Rating v-model="rpe" :stars="10" cancel="false" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="font-medium text-gray-700">Самочувствие</label>
          <Dropdown
              v-model="wellbeing"
              :options="wellbeingOptions"
              optionLabel="label"
              placeholder="Выберите состояние"
              class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="font-medium text-gray-700">Заметки атлета</label>
          <Textarea
              v-model="athleteNotion"
              rows="4"
              autoResize
              class="w-full"
              placeholder="Добавьте заметки о тренировке..."
          />
        </div>
      </div>

      <Button
          label="Сохранить"
          class="w-full"
          @click="confirmSave"
          :disabled="!selectedActivity"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import Dialog from 'primevue/dialog'
import RadioButton from 'primevue/radiobutton'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import {useConfirm} from 'primevue/useconfirm'
import {useToast} from 'primevue/usetoast'

import {Activity, Trainings, UplaodActivity} from '@/model/types'
import {dateFormatter} from '@/utils/formatters'
import {api} from "@/api";

/**
 * Props
 */
const props = defineProps<{
  modelValue: boolean
  trainingId: number
  training?: Trainings
  activities?: Activity[]
  position?: string
}>()

/**
 * Emits
 */
const emit = defineEmits<{
  (e: 'close', value: boolean): void
}>()


const selectedActivity = ref<Activity | null>(null)
const activityToUpload = ref<UplaodActivity>({
  title: '',
  avgCadence: 0,
  avgHeartRate: 0,
  trainingId: 0,
  elevationGain: 0,
  durationMinutes: 0
})
const confirm = useConfirm()
const toast = useToast()
const athleteNotion = ref('')
const rpe = ref(0)
const wellbeing = ref<string | null>(null)
const wellbeingOptions = [
  { label: 'Отлично', value: 'excellent' },
  { label: 'Хорошо', value: 'good' },
  { label: 'Нормально', value: 'normal' },
  { label: 'Плохо', value: 'bad' },
  { label: 'Очень плохо', value: 'very_bad' }
]

/**
 * Confirm dialog
 */
const confirmSave = () => {
  confirm.require({
    message: 'Вы уверены что хотите сохранить эту тренировку',
    header: 'Сохранение',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Отмена',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Да'
    },
    accept: async () => {
      await uploadResult()
      emit('close', true)
      toast.add({ severity: 'info', summary: 'Загрузка', detail: 'Загрузка прошла успешна', life: 3000 });
    }
  })
}
const uploadResult = async () => {
  console.log(selectedActivity.value, activityToUpload.value)
  if (!selectedActivity.value) return
  activityToUpload.value.title = props.training?.title ?? ''
  activityToUpload.value.avgCadence =  Math.floor(selectedActivity.value?.average_cadence) ?? 0
  activityToUpload.value.avgHeartRate = Math.floor(selectedActivity.value?.average_heartrate) ?? 0
  activityToUpload.value.trainingId = props.trainingId
  activityToUpload.value.elevationGain = Math.floor(selectedActivity.value?.total_elevation_gain) ?? 0
  activityToUpload.value.durationMinutes = Math.floor(selectedActivity.value?.moving_time) ?? 0

  await api.uploadActivity(activityToUpload.value)
}
</script>
