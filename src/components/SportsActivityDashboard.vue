<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h2 class="text-4xl font-bold text-gray-800 mb-8 text-center">Спортивная статистика</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <Card class="bg-gradient-to-br from-purple-500 to-purple-700 border-0">
        <template #content>
          <div class="text-center text-white">
            <h3 class="text-sm font-medium opacity-90 mb-2">Всего активностей</h3>
            <p class="text-4xl font-bold">{{ activities.length }}</p>
          </div>
        </template>
      </Card>

      <Card class="bg-gradient-to-br from-blue-500 to-blue-700 border-0">
        <template #content>
          <div class="text-center text-white">
            <h3 class="text-sm font-medium opacity-90 mb-2">Общая дистанция</h3>
            <p class="text-4xl font-bold">{{ totalDistance }} км</p>
          </div>
        </template>
      </Card>

      <Card class="bg-gradient-to-br from-green-500 to-green-700 border-0">
        <template #content>
          <div class="text-center text-white">
            <h3 class="text-sm font-medium opacity-90 mb-2">Общее время</h3>
            <p class="text-4xl font-bold">{{ totalTime }} ч</p>
          </div>
        </template>
      </Card>

      <Card class="bg-gradient-to-br from-orange-500 to-orange-700 border-0">
        <template #content>
          <div class="text-center text-white">
            <h3 class="text-sm font-medium opacity-90 mb-2">Набор высоты</h3>
            <p class="text-4xl font-bold">{{ totalElevation }} м</p>
          </div>
        </template>
      </Card>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <template #title>
          <div class="text-center text-xl font-semibold text-gray-700">
            Дистанция по активностям
          </div>
        </template>
        <template #content>
          <canvas ref="distanceChart" class="w-full"></canvas>
        </template>
      </Card>

      <Card>
        <template #title>
          <div class="text-center text-xl font-semibold text-gray-700">
            Средняя скорость
          </div>
        </template>
        <template #content>
          <canvas ref="speedChart" class="w-full"></canvas>
        </template>
      </Card>

      <Card>
        <template #title>
          <div class="text-center text-xl font-semibold text-gray-700">
            Набор высоты
          </div>
        </template>
        <template #content>
          <canvas ref="elevationChart" class="w-full"></canvas>
        </template>
      </Card>

      <Card>
        <template #title>
          <div class="text-center text-xl font-semibold text-gray-700">
            Пульс (средний/макс)
          </div>
        </template>
        <template #content>
          <canvas ref="heartrateChart" class="w-full"></canvas>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Chart, registerables } from 'chart.js';
import Card from 'primevue/card';
import {api} from "@/api";

const data = ref();

Chart.register(...registerables);

interface Activity {
  sport_type: string;
  distance: number;
  moving_time: number;
  total_elevation_gain: number;
  average_speed: number;
  average_cadence: number;
  average_heartrate: number;
  max_heartrate: number;
}

const activities: Activity[] = [
  {
    sport_type: "Ride",
    distance: 8545.4,
    moving_time: 1759,
    total_elevation_gain: 19.3,
    average_speed: 4.858,
    average_cadence: 65,
    average_heartrate: 0,
    max_heartrate: 0
  },
  {
    sport_type: "Ride",
    distance: 8794.9,
    moving_time: 1621,
    total_elevation_gain: 90.3,
    average_speed: 5.426,
    average_cadence: 69.8,
    average_heartrate: 0,
    max_heartrate: 0
  },
  {
    sport_type: "Ride",
    distance: 20860.1,
    moving_time: 4726,
    total_elevation_gain: 147.9,
    average_speed: 4.414,
    average_cadence: 61.8,
    average_heartrate: 0,
    max_heartrate: 0
  },
  {
    sport_type: "Ride",
    distance: 66625.1,
    moving_time: 16588,
    total_elevation_gain: 1886.7,
    average_speed: 4.016,
    average_cadence: 61.6,
    average_heartrate: 134,
    max_heartrate: 169
  },
  {
    sport_type: "Ride",
    distance: 76234.8,
    moving_time: 11344,
    total_elevation_gain: 756.3,
    average_speed: 6.72,
    average_cadence: 73.6,
    average_heartrate: 135.3,
    max_heartrate: 165
  },
  {
    sport_type: "Ride",
    distance: 14593.4,
    moving_time: 3143,
    total_elevation_gain: 98.8,
    average_speed: 4.643,
    average_cadence: 58.1,
    average_heartrate: 116.9,
    max_heartrate: 161
  },
  {
    sport_type: "Ride",
    distance: 8592.6,
    moving_time: 1617,
    total_elevation_gain: 85.6,
    average_speed: 5.314,
    average_cadence: 67.7,
    average_heartrate: 143.6,
    max_heartrate: 158
  },
  {
    sport_type: "Run",
    distance: 1872.3,
    moving_time: 713,
    total_elevation_gain: 21,
    average_speed: 2.626,
    average_cadence: 0,
    average_heartrate: 0,
    max_heartrate: 0
  },
  {
    sport_type: "Run",
    distance: 1360.9,
    moving_time: 491,
    total_elevation_gain: 16.4,
    average_speed: 2.772,
    average_cadence: 0,
    average_heartrate: 153.1,
    max_heartrate: 173
  },
  {
    sport_type: "Run",
    distance: 1445.6,
    moving_time: 549,
    total_elevation_gain: 13.5,
    average_speed: 2.633,
    average_cadence: 0,
    average_heartrate: 141.4,
    max_heartrate: 169
  }
];

const distanceChart = ref<HTMLCanvasElement | null>(null);
const speedChart = ref<HTMLCanvasElement | null>(null);
const elevationChart = ref<HTMLCanvasElement | null>(null);
const heartrateChart = ref<HTMLCanvasElement | null>(null);

const totalDistance = computed(() => {
  return (activities.reduce((sum, a) => sum + a.distance, 0) / 1000).toFixed(2);
});

const totalTime = computed(() => {
  return (activities.reduce((sum, a) => sum + a.moving_time, 0) / 3600).toFixed(2);
});

const totalElevation = computed(() => {
  return activities.reduce((sum, a) => sum + a.total_elevation_gain, 0).toFixed(0);
});

const createCharts = () => {
  const labels = activities.map((_, i) => `${activities[i].sport_type} ${i + 1}`);

  // Дистанция
  if (distanceChart.value) {
    new Chart(distanceChart.value, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Дистанция (км)',
          data: activities.map(a => (a.distance / 1000).toFixed(2)),
          backgroundColor: activities.map(a =>
              a.sport_type === 'Ride' ? 'rgba(54, 162, 235, 0.8)' : 'rgba(255, 99, 132, 0.8)'
          ),
          borderColor: activities.map(a =>
              a.sport_type === 'Ride' ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)'
          ),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  // Скорость
  if (speedChart.value) {
    new Chart(speedChart.value, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Средняя скорость (м/с)',
          data: activities.map(a => a.average_speed.toFixed(2)),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  // Набор высоты
  if (elevationChart.value) {
    new Chart(elevationChart.value, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Набор высоты (м)',
          data: activities.map(a => a.total_elevation_gain.toFixed(1)),
          backgroundColor: 'rgba(153, 102, 255, 0.8)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  // Пульс
  if (heartrateChart.value) {
    new Chart(heartrateChart.value, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Средний пульс',
            data: activities.map(a => a.average_heartrate || null),
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            tension: 0.4
          },
          {
            label: 'Макс пульс',
            data: activities.map(a => a.max_heartrate || null),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: true }
        }
      }
    });
  }
};

onMounted(() => {
  createCharts();
});
</script>