<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-600 pb-6">
    <!-- Header / Tabs -->
    <div class="sticky top-0 z-10 bg-gradient-to-r from-indigo-600/95 to-purple-600/95 shadow-lg">
      <div class="py-4">

        <div class="flex justify-center">
          <div class="bg-white/10 backdrop-blur-md rounded-full p-1 flex gap-1">
            <button
                v-for="tab in tabs"
                :key="tab.key"
                @click="changeTab(tab.key)"
                :disabled="loading"
                :class="['px-3 py-2 rounded-full text-sm font-medium transition-all duration-200', activeTab === tab.key ? 'bg-white text-indigo-600 shadow-sm' : 'text-white/90 hover:bg-white/10']"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Metrics -->
    <div class="flex items-center justify-content-evenly p-2">
      <Card v-for="(metric, idx) in metrics" :key="idx"
            class="flex items-center justify-center shadow-md rounded-xl animate-slideUp text-center">
        <template #content>
          <div class="text-3xl">{{ metric.icon }}</div>
          <p class="text-xl font-bold text-gray-700">
            {{ metric.value }}
            <span class="text-sm text-gray-500 font-normal">{{ metric.unit }}</span>
          </p>
          <p class="text-xs text-gray-500">{{ metric.label }}</p>
        </template>
      </Card>
    </div>

    <div class="px-4 space-y-4">
      <Card class="rounded-xl shadow-lg">
        <template #title>
          <div class="flex items-center gap-2 font-semibold text-gray-800 text-lg">📊 Дистанция по активностям</div>
        </template>
        <template #content>
          <div v-if="!hasData" class="py-12 text-center text-gray-500">Нет активностей для отображения</div>
          <div v-else class="h-52">
            <canvas ref="distanceChart"></canvas>
          </div>
        </template>
      </Card>

      <Card class="rounded-xl shadow-lg">
        <template #title>
          <div class="flex items-center gap-2 font-semibold text-gray-800 text-lg">💨 Средняя скорость / Темп</div>
        </template>
        <template #content>
          <div v-if="!hasData" class="py-12 text-center text-gray-500">Нет активностей для отображения</div>
          <div v-else class="h-52">
            <canvas ref="speedChart"></canvas>
          </div>
        </template>
      </Card>

      <Card class="rounded-xl shadow-lg">
        <template #title>
          <div class="flex items-center gap-2 font-semibold text-gray-800 text-lg">📈 Набор высоты</div>
        </template>
        <template #content>
          <div v-if="!hasData" class="py-12 text-center text-gray-500">Нет активностей для отображения</div>
          <div v-else class="h-52">
            <canvas ref="elevationChart"></canvas>
          </div>
        </template>
      </Card>

      <Card class="rounded-xl shadow-lg">
        <template #title>
          <div class="flex items-center gap-2 font-semibold text-gray-800 text-lg">❤️ Пульс (средний/макс)</div>
        </template>
        <template #content>
          <div v-if="!hasData" class="py-12 text-center text-gray-500">Нет активностей для отображения</div>
          <div v-else class="h-52">
            <canvas ref="heartRateChart"></canvas>
          </div>
        </template>
      </Card>

      <Card v-if="activeTab !== 'all'" class="rounded-xl shadow-lg">
        <template #title>
          <div class="flex items-center gap-2 font-semibold text-gray-800 text-lg">📝 Сводка</div>
        </template>
        <template #content>
          <div class="space-y-3">
            <div v-if="activeTab === 'ride' || activeTab === 'all'"
                 class="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div class="flex items-center gap-2 mb-3">🚴 <span class="font-semibold text-gray-800">Велозаезды</span>
              </div>
              <div class="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p class="text-xl font-bold">{{ rideStats.distance }}</p>
                  <p class="text-xs text-gray-500">км</p>
                </div>
                <div>
                  <p class="text-xl font-bold">{{ rideStats.time }}</p>
                  <p class="text-xs text-gray-500">ч</p>
                </div>
                <div>
                  <p class="text-xl font-bold">{{ rideStats.elevation }}</p>
                  <p class="text-xs text-gray-500">м подъем</p>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'run' || activeTab === 'all'"
                 class="p-4 rounded-lg bg-red-50 border border-red-200">
              <div class="flex items-center gap-2 mb-3">🏃 <span class="font-semibold text-gray-800">Пробежки</span>
              </div>
              <div class="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p class="text-xl font-bold">{{ runStats.distance }}</p>
                  <p class="text-xs text-gray-500">км</p>
                </div>
                <div>
                  <p class="text-xl font-bold">{{ runStats.time }}</p>
                  <p class="text-xs text-gray-500">минут</p>
                </div>
                <div>
                  <p class="text-xl font-bold">{{ runStats.elevation }}</p>
                  <p class="text-xs text-gray-500">м подъем</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted, onBeforeUnmount, nextTick} from 'vue';
import {Chart, registerables, ChartConfiguration} from 'chart.js';
import Card from 'primevue/card';
import {api} from '@/api';
import type {Activity} from '@/model/types';
import {dateFormatter} from "@/utils/dayFormatter";

Chart.register(...registerables);

// state
const activities = ref<Activity[]>([]);
const loading = ref(false);
const activeTab = ref<'all' | 'ride' | 'run'>('all');

// canvas refs
const distanceChart = ref<HTMLCanvasElement | null>(null);
const speedChart = ref<HTMLCanvasElement | null>(null);
const elevationChart = ref<HTMLCanvasElement | null>(null);
const heartRateChart = ref<HTMLCanvasElement | null>(null);

// charts map
const charts = ref<Record<string, Chart | null>>({
  distance: null,
  speed: null,
  elevation: null,
  heartRate: null,
});

// helpers
const hasData = computed(() => filteredActivities.value.length > 0);

const changeTab = (tab: 'all' | 'ride' | 'run') => {
  activeTab.value = tab;
};

// computed stats and tabs
const filteredActivities = computed(() => {
  console.log()
  if (activeTab.value === 'ride') return activities.value.filter(a => a.sport_type.toLowerCase() === 'ride' || a.sport_type.toLowerCase() === 'virtualride');
  if (activeTab.value === 'run') return activities.value.filter(a => a.sport_type.toLowerCase() === 'run');
  return activities.value;
});

const activityStats = computed(() => {
  const stats = {
    ride: {count: 0, distance: 0, time: 0, elevation: 0},
    run: {count: 0, distance: 0, time: 0, elevation: 0}
  };
  activities.value.forEach(a => {
    const type = a.sport_type.toLowerCase();
    if (type === 'ride' || type === 'virtualride' || type === 'run') {
      const bucket = type === 'ride' || type === 'virtualride' ? stats.ride : stats.run;
      bucket.count++;
      bucket.distance += a.distance;
      bucket.time += a.moving_time;
      bucket.elevation += a.total_elevation_gain;
    }
  });
  return stats;
});

const rideCount = computed(() => activityStats.value.ride.count);
const runCount = computed(() => activityStats.value.run.count);

const totalDistance = computed(() => (filteredActivities.value.reduce((s, a) => s + a.distance, 0) / 1000).toFixed(1));
const totalTime = computed(() => (filteredActivities.value.reduce((s, a) => s + a.moving_time, 0) / 3600).toFixed(1));
const totalElevation = computed(() => Math.round(filteredActivities.value.reduce((s, a) => s + a.total_elevation_gain, 0)).toString());

const metrics = computed(() => [
  {label: 'Дистанция', value: totalDistance.value, unit: 'км', icon: '📏'},
  {label: 'Время', value: totalTime.value, unit: 'ч', icon: '⏱️'},
  {label: 'Подъем', value: totalElevation.value, unit: 'м', icon: '⛰️'},
]);

const rideStats = computed(() => {
  const rides = activities.value.filter(a => a.sport_type.toLowerCase() === 'ride' || a.sport_type.toLowerCase() === 'virtualride');
  return {
    distance: (rides.reduce((s, a) => s + a.distance, 0) / 1000).toFixed(1),
    time: (rides.reduce((s, a) => s + a.moving_time, 0) / 3600).toFixed(1),
    elevation: Math.round(rides.reduce((s, a) => s + a.total_elevation_gain, 0)).toString(),
  };
});

const runStats = computed(() => {
  const runs = activities.value.filter(a => a.sport_type.toLowerCase() === 'run');
  return {
    distance: (runs.reduce((s, a) => s + a.distance, 0) / 1000).toFixed(1),
    time: Math.round(runs.reduce((s, a) => s + a.moving_time, 0) / 60).toString(), // minutes
    elevation: Math.round(runs.reduce((s, a) => s + a.total_elevation_gain, 0)).toString(),
  };
});

const tabs = computed(() => [
  {key: 'all', label: `🌍 Все`},
  {key: 'ride', label: `🚴 Велозаезды (${rideCount.value})`},
  {key: 'run', label: `🏃 Пробежки (${runCount.value})`},
]);

// simple debounce
const debounce = (fn: Function, ms = 300) => {
  let t: ReturnType<typeof setTimeout> | null = null;
  return (...args: any[]) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};

// chart utilities
const destroyCharts = () => {
  Object.keys(charts.value).forEach(k => {
    const c = charts.value[k];
    if (c && typeof c.destroy === 'function') {
      try {
        c.destroy();
      } catch (e) { /* safe */
      }
    }
    charts.value[k] = null;
  });
};

const createChart = (canvas: HTMLCanvasElement | null, config: ChartConfiguration) => {
  if (!canvas) return null;
  try {
    // Chart accepts canvas element or context
    return new Chart(canvas, config as any);
  } catch (e) {
    console.error('Chart create error', e);
    return null;
  }
};

const updateCharts = async () => {
  destroyCharts();
  if (!filteredActivities.value.length) return;

  await nextTick();

  const data = filteredActivities.value;
  const baseConfig = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {display: false},
      tooltip: {mode: 'index'},
    },
  } as any;

  // distance (horizontal bar)
  if (distanceChart.value) {
    charts.value.distance = createChart(distanceChart.value, {
      type: 'bar',
      data: {
        labels: data.map((a, i) => `${a.sport_type === 'Ride' ? '🚴' : '🏃'} ${dateFormatter(a.start_date_local)}`),
        datasets: [{
          data: data.map(a => +(a.distance / 1000).toFixed(2)),
          borderRadius: 6,
          backgroundColor: data.map(a => a.sport_type.toLowerCase() === 'ride' || a.sport_type.toLowerCase() === 'virtualride' ? 'rgba(59,130,246,0.8)' : 'rgba(239,68,68,0.8)'),
        }],
      },
      options: {...baseConfig, indexAxis: 'y'},
    } as any);
  }

  // speed / pace
  if (speedChart.value) {
    charts.value.speed = createChart(speedChart.value, {
      type: 'line',
      data: {
        labels: data.map((_, i) => i + 1),
        datasets: [{
          data: data.map(a => a.sport_type.toLowerCase() === 'ride' || a.sport_type.toLowerCase() === 'virtualride' ? +(a.average_speed * 3.6).toFixed(2) : +(1000 / a.average_speed / 60).toFixed(2)),
          fill: true,
          tension: 0.35,
          borderColor: 'rgba(16,185,129,1)',
          backgroundColor: 'rgba(16,185,129,0.08)',
        }],
      },
      options: {
        ...baseConfig,
        scales: {
          y: {
            ticks: {
              callback(value: any) {
                return activeTab.value === 'ride' ? `${value} км/ч` : `${value} мин/км`;
              },
            },
          },
        },
      },
    } as any);
  }

  // elevation
  if (elevationChart.value) {
    const ctx = elevationChart.value.getContext('2d');
    let bg: CanvasGradient | string = 'rgba(168,85,247,0.7)';
    if (ctx) {
      const g = ctx.createLinearGradient(0, 0, 0, 200);
      g.addColorStop(0, 'rgba(168,85,247,0.8)');
      g.addColorStop(1, 'rgba(168,85,247,0.2)');
      bg = g;
    }
    charts.value.elevation = createChart(elevationChart.value, {
      type: 'bar',
      data: {
        labels: data.map((_, i) => i + 1),
        datasets: [{data: data.map(a => Math.round(a.total_elevation_gain)), backgroundColor: bg, borderRadius: 6}],
      },
      options: baseConfig,
    } as any);
  }

  // heart rate
  if (heartRateChart.value) {
    charts.value.heartRate = createChart(heartRateChart.value, {
      type: 'line',
      data: {
        labels: data.map((_, i) => i + 1),
        datasets: [
          {
            label: 'Средний',
            data: data.map(a => a.average_heartrate || null),
            borderDash: [5, 5],
            tension: 0.3,
            borderColor: 'rgba(251,146,60,1)'
          },
          {
            label: 'Макс.',
            data: data.map(a => a.max_heartrate || null),
            tension: 0.3,
            borderColor: 'rgba(239,68,68,1)'
          },
        ],
      },
      options: {...baseConfig, plugins: {...baseConfig.plugins, legend: {display: true}}},
    } as any);
  }
};

const debouncedUpdate = debounce(updateCharts, 500);

// watch activities and tab
watch([() => activeTab.value, () => activities.value?.length], () => {
  debouncedUpdate();
});

// load activities
const loadActivities = async () => {
  loading.value = true;
  try {
    const res = await api.getStravaActivity();
    // expect array
    if (!Array.isArray(res)) {
      activities.value = [];
    } else {
      activities.value = res;
      const athleteId = res[0].athlete.id;
      console.log(athleteId, 'athleteId');
      sessionStorage.setItem('athleteId', athleteId);
      sessionStorage.setItem('activities', JSON.stringify(res));
    }
  } catch (e) {
    console.error('Failed to load activities', e);
    activities.value = [];
  } finally {
    loading.value = false;
    // initial draw
    debouncedUpdate();
  }
};

onMounted(async () => {
  const activitiesFromStorage = JSON.parse(<string>sessionStorage.getItem('activities'))
  console.log(activitiesFromStorage, 'activitiesFromStorage')
  if (!activitiesFromStorage || activitiesFromStorage?.length === 0) {
    await loadActivities();
  }else {
    activities.value = activitiesFromStorage
  }

});

onBeforeUnmount(() => {
  destroyCharts();
});
</script>

<style scoped>
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideUp {
  animation: slideUp 0.25s ease-out both;
}

button {
  -webkit-tap-highlight-color: transparent;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
