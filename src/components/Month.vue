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
            <!-- события -->
            <div v-for="event in getCardsForDate(day.date)" :key="event.id"
              class="truncate text-xs rounded px-1 py-0.5 mt-1 cursor-pointer" :class="event.color">
              {{ event.title }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const today = new Date();
const selectedDate = ref(today);
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

// события
const events = ref([
  { id: 1, date: new Date(2025, 9, 1), title: "MR", color: "bg-red-500 text-white" },
  { id: 2, date: new Date(2025, 9, 2), title: "HIIT", color: "bg-red-400 text-white" },
  { id: 3, date: new Date(2025, 9, 3), title: "Str", color: "bg-blue-400 text-white" },
  { id: 4, date: new Date(2025, 9, 5), title: "LR", color: "bg-red-500 text-white" },
  { id: 5, date: new Date(2025, 9, 6), title: "Rec", color: "bg-green-500 text-white" },
]);

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const monthNames = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

const monthName = computed(() => monthNames[currentMonth.value]);

// сетка календаря
const daysInMonth = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);

  const days = [];

  // Преобразуем воскресенье (0) в 6, остальные дни смещаем на -1
  let start = firstDay.getDay();
  start = start === 0 ? 6 : start - 1;

  // Добавляем дни предыдущего месяца
  for (let i = 0; i < start; i++) {
    const d = new Date(currentYear.value, currentMonth.value, i - start + 1);
    days.push({ date: d, currentMonth: false });
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const d = new Date(currentYear.value, currentMonth.value, i);
    days.push({ date: d, currentMonth: true });
  }

  while (days.length % 7 !== 0) {
    const d = new Date(
      currentYear.value,
      currentMonth.value,
      lastDay.getDate() + (days.length - start - lastDay.getDate()) + 1
    );
    days.push({ date: d, currentMonth: false });
  }

  return days;
});

// Разбиваем дни на недели
const weeks = computed(() => {
  const days = daysInMonth.value;
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
});

// события на день
const getCardsForDate = (date) => {
  return events.value.filter(
    (e) =>
      e.date.getDate() === date.getDate() &&
      e.date.getMonth() === date.getMonth() &&
      e.date.getFullYear() === date.getFullYear()
  );
};

// подсветка текущего дня
const isToday = (date) => {
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
};

// выбор даты
const selectDate = (date) => {
  selectedDate.value = date;
  console.log(selectedDate.value);
};
const isSelected = (date) => {
  return (
    selectedDate.value.getDate() === date.getDate() &&
    selectedDate.value.getMonth() === date.getMonth() &&
    selectedDate.value.getFullYear() === date.getFullYear()
  );
};

// переключение месяцев
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};
const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};
</script>

<style scoped>
td {
  vertical-align: top;
}
</style>
