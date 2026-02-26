<template>
  <div class="p-4 bg-white rounded-xl shadow-md w-full max-w-lg mx-auto">
    <!-- Заголовок месяца -->
    <div class="flex justify-between items-center mb-4">
      <Button icon="pi pi-chevron-left" text @click="prevMonth" />
      <h2 class="text-xl font-bold">{{ monthName }} {{ currentYear }}</h2>
      <Button icon="pi pi-chevron-right" text @click="nextMonth" />
    </div>

    <!-- Сетка -->
    <table class="w-full border-separate border-spacing-px bg-gray-200">
      <thead>
        <tr>
          <th v-for="day in weekDays" :key="day" class="text-xs font-medium text-gray-500 p-2 bg-white">
            {{ day }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in weeks" :key="week[0].date.toDateString()">
          <td v-for="day in week" :key="day.date.toDateString()" class="bg-white p-1 align-top h-[90px]" :class="{
            'text-gray-400': !day.currentMonth,
            'border border-blue-400': isToday(day.date)
          }">

            <div class="w-6 h-6 flex items-center justify-center text-sm rounded-full cursor-pointer"
              :class="isSelected(day.date) ? 'bg-blue-500 text-white' : ''" @click="selectDate(day.date)">
              {{ day.date.getDate() }}
            </div>
            <div v-for="event in getCardsForDate(day.date)" :key="event.trainingId"
              class="truncate text-xs rounded px-1 py-0.5 mt-1 cursor-pointer h-2rem" :class="event.isDone ? 'bg-green-500' : 'bg-red-500'">
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <canvas class="mb-8" ref="chart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { api } from "@/api";
import type { ShortTrainings } from "@/model/types";
import { Chart } from 'chart.js/auto';
import { ArcElement, Legend, Tooltip } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

const chart = ref<HTMLCanvasElement | null>(null);
const today = new Date();
const selectedDate = ref(today);
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const events = ref<ShortTrainings[]>([]);

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const monthNames = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

const monthName = computed(() => monthNames[currentMonth.value]);

const daysInMonth = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
  const days: { date: Date; currentMonth: boolean }[] = [];

  let start = firstDay.getDay();
  start = start === 0 ? 6 : start - 1;

  for (let i = 0; i < start; i++) {
    days.push({ date: new Date(currentYear.value, currentMonth.value, i - start + 1), currentMonth: false });
  }
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({ date: new Date(currentYear.value, currentMonth.value, i), currentMonth: true });
  }
  while (days.length % 7 !== 0) {
    days.push({ date: new Date(currentYear.value, currentMonth.value, lastDay.getDate() + (days.length - start - lastDay.getDate()) + 1), currentMonth: false });
  }
  return days;
});

const weeks = computed(() => {
  const result = [];
  for (let i = 0; i < daysInMonth.value.length; i += 7) {
    result.push(daysInMonth.value.slice(i, i + 7));
  }
  return result;
});

const isSameDay = (a: Date, b: Date) =>
  a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();

const isToday = (date: Date) => isSameDay(date, new Date());
const isSelected = (date: Date) => isSameDay(date, selectedDate.value);
const selectDate = (date: Date) => { selectedDate.value = date; };

const getCardsForDate = (date: Date) =>
  events.value.filter(e => isSameDay(new Date(e.trainingDay), date));

const prevMonth = () => {
  if (currentMonth.value === 0) { currentMonth.value = 11; currentYear.value--; }
  else currentMonth.value--;
};
const nextMonth = () => {
  if (currentMonth.value === 11) { currentMonth.value = 0; currentYear.value++; }
  else currentMonth.value++;
};

onMounted(async () => {
  events.value = await api.getAthleteShortTrainings();
  const done = events.value.filter(t => t.isDone).length;
  const total = events.value.length;
  const donePct = total ? ((done / total) * 100).toFixed(1) : '0';
  const notDonePct = total ? (((total - done) / total) * 100).toFixed(1) : '0';

  new Chart(chart.value!, {
    type: 'doughnut',
    data: {
      labels: [`Выполнено (${donePct}%)`, `Не выполнено (${notDonePct}%)`],
      datasets: [{ data: [done, total - done], backgroundColor: ['#22c55e', '#ef4444'] }],
    },
    options: {
      plugins: {
        title: { display: true, text: 'Статистика тренировок' },
        legend: { position: 'top' },
      },
    },
  });
});
</script>
