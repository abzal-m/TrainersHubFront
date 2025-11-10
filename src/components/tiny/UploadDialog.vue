<template>
  <Toast />
  <ConfirmDialog />

  <Dialog
      :visible="modelValue"
      @update:visible="emit('update:modelValue', $event)"
      modal
      header="Выберите тренировку для загрузки"
      :style="{ width: '25rem' }"
      :position="position"
      :draggable="false"
  >
    <form @submit.prevent="confirmSave" class="space-y-4">
      <!-- Заголовок -->
      <div>
        <div class="text-md text-gray-700 font-semibold">
          {{ training?.title }}
        </div>
        <div class="text-sm text-gray-500">
          {{ training?.description }}
        </div>
      </div>

      <!-- Последние тренировки -->
      <div class="flex flex-col gap-3">
        <p class="font-medium text-gray-700">Последние тренировки</p>
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
        <p v-if="errors.activity" class="text-red-500 text-sm mt-1">
          {{ errors.activity }}
        </p>
      </div>

      <!-- Поля ввода -->
      <div class="flex flex-col gap-4">
        <!-- RPE -->
        <div class="flex flex-col gap-2">
          <label class="font-medium text-gray-700">RPE (восприятие нагрузки)</label>
          <div
              :class="[
              'rounded-md border p-2 transition',
              errors.rpe ? 'border-red-500 ring-1 ring-red-400' : 'border-gray-300'
            ]"
          >
            <Rating v-model="rpe" :stars="10" cancel="false" />
          </div>
          <p v-if="errors.rpe" class="text-red-500 text-sm mt-1">
            {{ errors.rpe }}
          </p>
        </div>

        <!-- Самочувствие -->
        <div class="flex flex-col gap-2">
          <label class="font-medium text-gray-700">Самочувствие</label>
          <Dropdown
              v-model="wellbeing"
              :options="wellbeingOptions"
              optionLabel="label"
              placeholder="Выберите состояние"
              class="w-full"
              :class="{ 'p-invalid': errors.wellbeing }"
          />
          <p v-if="errors.wellbeing" class="text-red-500 text-sm mt-1">
            {{ errors.wellbeing }}
          </p>
        </div>

        <!-- Заметки -->
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

      <!-- Кнопка -->
      <Button
          type="submit"
          label="Сохранить"
          class="w-full"
          :disabled="isSubmitting"
      />
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import RadioButton from 'primevue/radiobutton'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import Rating from 'primevue/rating'

import { Activity, Trainings, UplaodActivity } from '@/model/types'
import { dateFormatter } from '@/utils/formatters'
import { api } from '@/api'

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

// refs
const selectedActivity = ref<Activity | null>(null)
const athleteNotion = ref('')
const rpe = ref(0)
const wellbeing = ref<string | null>(null)
const isSubmitting = ref(false)

const wellbeingOptions = [
  { label: 'Отлично', value: 'excellent' },
  { label: 'Хорошо', value: 'good' },
  { label: 'Нормально', value: 'normal' },
  { label: 'Плохо', value: 'bad' },
  { label: 'Очень плохо', value: 'very_bad' }
]

// utils
const confirm = useConfirm()
const toast = useToast()

// ошибки валидации
const errors = ref({
  activity: '',
  rpe: '',
  wellbeing: ''
})

/**
 * Проверка формы
 */
const validateForm = () => {
  errors.value = { activity: '', rpe: '', wellbeing: '' }
  let valid = true

  if (!selectedActivity.value) {
    errors.value.activity = 'Выберите активность'
    valid = false
  }
  if (!rpe.value || rpe.value === 0) {
    errors.value.rpe = 'Укажите RPE'
    valid = false
  }
  if (!wellbeing.value) {
    errors.value.wellbeing = 'Выберите самочувствие'
    valid = false
  }

  return valid
}

/**
 * Подтверждение и сохранение
 */
const confirmSave = () => {
  if (!validateForm()) return

  confirm.require({
    message: 'Вы уверены, что хотите сохранить эту тренировку?',
    header: 'Сохранение',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Отмена',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: { label: 'Да' },
    accept: async () => {
      await uploadResult()
      emit('close', true)
      toast.add({
        severity: 'success',
        summary: 'Готово',
        detail: 'Тренировка успешно сохранена',
        life: 3000
      })
    }
  })
}

/**
 * Отправка данных на сервер
 */
const uploadResult = async () => {
  if (!selectedActivity.value) return

  isSubmitting.value = true

  const activityToUpload: UplaodActivity = {
    title: props.training?.title ?? '',
    avgCadence: Math.floor(selectedActivity.value?.average_cadence ?? 0),
    avgHeartRate: Math.floor(selectedActivity.value?.average_heartrate ?? 0),
    trainingId: props.trainingId,
    elevationGain: Math.floor(selectedActivity.value?.total_elevation_gain ?? 0),
    durationMinutes: Math.floor(selectedActivity.value?.moving_time ?? 0),
    // Новые поля
    rpe: rpe.value,
    wellbeing: wellbeing.value ?? "",
    athleteNotion: athleteNotion.value
  }

  try {
    await api.uploadActivity(activityToUpload)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Для PrimeVue Dropdown */
.p-invalid {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.2);
}
</style>
