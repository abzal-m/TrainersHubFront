<script setup lang="ts">
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import type { Trainings } from '@/model/types';

defineProps<{
  modelValue: boolean;
  training?: Trainings;
  position?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();
</script>

<template>
  <Dialog
      :visible="modelValue"
      @update:visible="$emit('update:modelValue', $event)"
      modal
      :header="training?.title"
      :style="{ width: '25rem' }"
      :position="position"
      :draggable="false"
  >
    <div class="space-y-4">
      <div>
        <div class="text-sm text-gray-600 font-semibold">Описание</div>
        <div class="text-sm">{{ training?.description }}</div>
      </div>

      <div class="card">
        <DataTable
            :value="training?.segments"
            size="small"
            tableStyle="min-width: 8rem"
            stripedRows
        >
          <Column field="order" header="#"></Column>
          <Column field="targetHeartRate" header="Пульс"></Column>
          <Column field="targetCadence" header="Каденс"></Column>
          <Column field="durationMinutes" header="Мин"></Column>
          <Column field="distanceKm" header="Дист (км)"></Column>
        </DataTable>
      </div>
    </div>
  </Dialog>
</template>
