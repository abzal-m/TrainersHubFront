<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-600 pb-6"
  >
    <div
      class="sticky top-0 z-10 bg-white/10 backdrop-blur-md p-4 border-b border-white/20"
    >
      <h2 class="text-2xl font-bold text-white text-center">
        Спортивная статистика
      </h2>

      <div
        class="flex justify-center gap-2 mt-4 border-b-2 border-white/20 pb-1"
      >
        <button
          @click="handleTabChange('all')"
          :disabled="isUpdating"
          :class="getTabClass('all')"
        >
          🌍 Все
        </button>
        <button
          @click="handleTabChange('ride')"
          :disabled="isUpdating"
          :class="getTabClass('ride')"
        >
          🚴 Велозаезды ({{ rideCount }})
        </button>
        <button
          @click="handleTabChange('run')"
          :disabled="isUpdating"
          :class="getTabClass('run')"
        >
          🏃 Пробежки ({{ runCount }})
        </button>
      </div>
    </div>

    <div class="p-4 grid grid-cols-3 gap-3">
      <Card
        v-for="(metric, idx) in metrics"
        :key="idx"
        class="flex items-center justify-center shadow-md rounded-xl animate-slideUp text-center"
      >
        <template #content>
          <div class="text-3xl">{{ metric.icon }}</div>
          <p class="text-xl font-bold text-gray-700">
            {{ metric.value }}
            <span class="text-sm text-gray-500 font-normal">{{
              metric.unit
            }}</span>
          </p>
          <p class="text-xs text-gray-500">{{ metric.label }}</p>
        </template>
      </Card>
    </div>

    <div class="px-4 space-y-4">
      <!-- Replace chart v-for with static cards -->
      <Card class="rounded-xl shadow-lg">
        <template #title>
          <div
            class="flex items-center gap-2 font-semibold text-gray-800 text-lg"
          >
            📊 Дистанция по активностям
          </div>
        </template>
        <template #content>
          <div class="h-52">
            <canvas ref="distanceChart"></canvas>
          </div>
        </template>
      </Card>

      <Card class="rounded-xl shadow-lg">
        <template #title>
          <div
            class="flex items-center gap-2 font-semibold text-gray-800 text-lg"
          >
            💨 Средняя скорость / Темп
          </div>
        </template>
        <template #content>
          <div class="h-52">
            <canvas ref="speedChart"></canvas>
          </div>
        </template>
      </Card>

      <Card class="rounded-xl shadow-lg">
        <template #title>
          <div
            class="flex items-center gap-2 font-semibold text-gray-800 text-lg"
          >
            📈 Набор высоты
          </div>
        </template>
        <template #content>
          <div class="h-52">
            <canvas ref="elevationChart"></canvas>
          </div>
        </template>
      </Card>

      <Card class="rounded-xl shadow-lg">
        <template #title>
          <div
            class="flex items-center gap-2 font-semibold text-gray-800 text-lg"
          >
            ❤️ Пульс (средний/макс)
          </div>
        </template>
        <template #content>
          <div class="h-52">
            <canvas ref="heartRateChart"></canvas>
          </div>
        </template>
      </Card>

      <Card v-if="activeTab !== 'all'" class="rounded-xl shadow-lg">
        <template #title>
          <div
            class="flex items-center gap-2 font-semibold text-gray-800 text-lg"
          >
            📝 Сводка
          </div>
        </template>
        <template #content>
          <div class="space-y-3">
            <div
              v-if="activeTab === 'ride' || activeTab === 'all'"
              class="p-4 rounded-lg bg-blue-50 border border-blue-200"
            >
              <div class="flex items-center gap-2 mb-3">
                🚴 <span class="font-semibold text-gray-800">Велозаезды</span>
              </div>
              <div class="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p class="text-xl font-bold">{{ rideStats.distance }}</p>
                  <p class="text-xs text-gray-500">км</p>
                </div>
                <div>
                  <p class="text-xl font-bold">{{ rideStats.time }}</p>
                  <p class="text-xs text-gray-500">часов</p>
                </div>
                <div>
                  <p class="text-xl font-bold">{{ rideStats.elevation }}</p>
                  <p class="text-xs text-gray-500">м подъем</p>
                </div>
              </div>
            </div>

            <div
              v-if="activeTab === 'run' || activeTab === 'all'"
              class="p-4 rounded-lg bg-red-50 border border-red-200"
            >
              <div class="flex items-center gap-2 mb-3">
                🏃 <span class="font-semibold text-gray-800">Пробежки</span>
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
import {
  ref,
  onMounted,
  computed,
  watch,
  nextTick,
  onBeforeUnmount,
} from "vue";
import { Chart, registerables, ChartConfiguration } from "chart.js";
import Card from "primevue/card";

Chart.register(...registerables);

type ActivityType = "all" | "ride" | "run";

interface Activity {
  sport_type: string;
  distance: number; // meters
  moving_time: number; // seconds
  total_elevation_gain: number; // meters
  average_speed: number; // m/s
  average_cadence: number;
  average_heartrate: number;
  max_heartrate: number;
}

const activities: Activity[] = [
  // ... (same activity data as provided)
  {
    sport_type: "Ride",
    distance: 8545.4,
    moving_time: 1759,
    total_elevation_gain: 19.3,
    average_speed: 4.858,
    average_cadence: 65,
    average_heartrate: 0,
    max_heartrate: 0,
  },
  {
    sport_type: "Ride",
    distance: 8794.9,
    moving_time: 1621,
    total_elevation_gain: 90.3,
    average_speed: 5.426,
    average_cadence: 69.8,
    average_heartrate: 0,
    max_heartrate: 0,
  },
  {
    sport_type: "Ride",
    distance: 20860.1,
    moving_time: 4726,
    total_elevation_gain: 147.9,
    average_speed: 4.414,
    average_cadence: 61.8,
    average_heartrate: 0,
    max_heartrate: 0,
  },
  {
    sport_type: "Ride",
    distance: 66625.1,
    moving_time: 16588,
    total_elevation_gain: 1886.7,
    average_speed: 4.016,
    average_cadence: 61.6,
    average_heartrate: 134,
    max_heartrate: 169,
  },
  {
    sport_type: "Ride",
    distance: 76234.8,
    moving_time: 11344,
    total_elevation_gain: 756.3,
    average_speed: 6.72,
    average_cadence: 73.6,
    average_heartrate: 135.3,
    max_heartrate: 165,
  },
  {
    sport_type: "Ride",
    distance: 14593.4,
    moving_time: 3143,
    total_elevation_gain: 98.8,
    average_speed: 4.643,
    average_cadence: 58.1,
    average_heartrate: 116.9,
    max_heartrate: 161,
  },
  {
    sport_type: "Ride",
    distance: 8592.6,
    moving_time: 1617,
    total_elevation_gain: 85.6,
    average_speed: 5.314,
    average_cadence: 67.7,
    average_heartrate: 143.6,
    max_heartrate: 158,
  },
  {
    sport_type: "Run",
    distance: 1872.3,
    moving_time: 713,
    total_elevation_gain: 21,
    average_speed: 2.626,
    average_cadence: 0,
    average_heartrate: 0,
    max_heartrate: 0,
  },
  {
    sport_type: "Run",
    distance: 1360.9,
    moving_time: 491,
    total_elevation_gain: 16.4,
    average_speed: 2.772,
    average_cadence: 0,
    average_heartrate: 153.1,
    max_heartrate: 173,
  },
  {
    sport_type: "Run",
    distance: 1445.6,
    moving_time: 549,
    total_elevation_gain: 13.5,
    average_speed: 2.633,
    average_cadence: 0,
    average_heartrate: 141.4,
    max_heartrate: 169,
  },
  {
    sport_type: "Ride",
    distance: 12345.0,
    moving_time: 2500,
    total_elevation_gain: 120.0,
    average_speed: 4.938,
    average_cadence: 63.0,
    average_heartrate: 125.0,
    max_heartrate: 155,
  },
];

const activeTab = ref<ActivityType>("all");

// Replace chart refs and types
const distanceChart = ref<HTMLCanvasElement | null>(null);
const speedChart = ref<HTMLCanvasElement | null>(null);
const elevationChart = ref<HTMLCanvasElement | null>(null);
const heartRateChart = ref<HTMLCanvasElement | null>(null);
const charts = ref<Record<string, Chart>>({});

// Add debounce utility
const debounce = (fn: Function, ms: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
};

// Update state management
const isUpdating = ref(false);
const updatePromise = ref<Promise<void> | null>(null);

// --- Computed Properties for Filtering and Stats ---

const filteredActivities = computed(() => {
  if (activeTab.value === "ride") {
    return activities.filter((a) => a.sport_type === "Ride");
  }
  if (activeTab.value === "run") {
    return activities.filter((a) => a.sport_type === "Run");
  }
  return activities; // 'all'
});

// Оптимизированные computed properties с кешированием
const activityStats = computed(() => {
  const stats = {
    ride: { count: 0, distance: 0, time: 0, elevation: 0 },
    run: { count: 0, distance: 0, time: 0, elevation: 0 },
  };

  activities.forEach((activity) => {
    const type = activity.sport_type.toLowerCase() as "ride" | "run";
    if (type in stats) {
      stats[type].count++;
      stats[type].distance += activity.distance;
      stats[type].time += activity.moving_time;
      stats[type].elevation += activity.total_elevation_gain;
    }
  });

  return stats;
});

const rideCount = computed(() => activityStats.value.ride.count);
const runCount = computed(() => activityStats.value.run.count);

const totalDistance = computed(() => {
  const total =
    filteredActivities.value.reduce((sum, a) => sum + a.distance, 0) / 1000;
  return total.toFixed(1);
});

const totalTime = computed(() => {
  const total =
    filteredActivities.value.reduce((sum, a) => sum + a.moving_time, 0) / 3600;
  return total.toFixed(1);
});

const totalElevation = computed(() => {
  const total = filteredActivities.value.reduce(
    (sum, a) => sum + a.total_elevation_gain,
    0
  );
  return total.toFixed(0);
});

const metrics = computed(() => [
  { label: "Дистанция", value: totalDistance.value, unit: "км", icon: "📏" },
  { label: "Время", value: totalTime.value, unit: "ч", icon: "⏱️" },
  { label: "Подъем", value: totalElevation.value, unit: "м", icon: "⛰️" },
]);

const rideStats = computed(() => {
  const rides = activities.filter((a) => a.sport_type === "Ride");
  return {
    distance: (rides.reduce((sum, a) => sum + a.distance, 0) / 1000).toFixed(1),
    time: (rides.reduce((sum, a) => sum + a.moving_time, 0) / 3600).toFixed(1),
    elevation: rides
      .reduce((sum, a) => sum + a.total_elevation_gain, 0)
      .toFixed(0),
  };
});

const runStats = computed(() => {
  const runs = activities.filter((a) => a.sport_type === "Run");
  return {
    distance: (runs.reduce((sum, a) => sum + a.distance, 0) / 1000).toFixed(1),
    time: (runs.reduce((sum, a) => sum + a.moving_time, 0) / 60).toFixed(0),
    elevation: runs
      .reduce((sum, a) => sum + a.total_elevation_gain, 0)
      .toFixed(0),
  };
});

// --- Charting Logic ---

const destroyCharts = () => {
  Object.values(charts.value).forEach((chart) => {
    if (chart) {
      chart.destroy();
    }
  });
  charts.value = {};
};

// Simplified chart creation
const createChart = (
  canvas: HTMLCanvasElement | null,
  config: ChartConfiguration
) => {
  if (!canvas) return null;
  try {
    return new Chart(canvas, config);
  } catch (e) {
    console.error("Error creating chart:", e);
    return null;
  }
};

// Обновляем функцию updateCharts с защитой от race conditions
const updateCharts = async () => {
  if (isUpdating.value) return;

  try {
    isUpdating.value = true;
    destroyCharts();

    // Wait for any pending animations
    await new Promise((resolve) => setTimeout(resolve, 500));

    const data = filteredActivities.value;
    if (!data.length) return;

    await nextTick();

    const baseConfig = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.9)",
          padding: 12,
          titleFont: { size: 13 },
          bodyFont: { size: 12 },
        },
      },
    };

    // Distance chart
    if (distanceChart.value) {
      charts.value.distance = createChart(distanceChart.value, {
        type: "bar",
        data: {
          labels: data.map(
            (a, i) => `${a.sport_type === "Ride" ? "🚴" : "🏃"} ${i + 1}`
          ),
          datasets: [
            {
              data: data.map((a) => +(a.distance / 1000).toFixed(2)),
              backgroundColor: data.map((a) =>
                a.sport_type === "Ride"
                  ? "rgba(59,130,246,0.8)"
                  : "rgba(239,68,68,0.8)"
              ),
              borderRadius: 6,
            },
          ],
        },
        options: { ...baseConfig, indexAxis: "y" },
      });
    }

    // Speed chart
    if (speedChart.value) {
      charts.value.speed = createChart(speedChart.value, {
        type: "line",
        data: {
          labels: data.map((_, i) => i + 1),
          datasets: [
            {
              data: data.map((a) =>
                a.sport_type === "Ride"
                  ? +(a.average_speed * 3.6).toFixed(2)
                  : +(1000 / a.average_speed / 60).toFixed(2)
              ),
              borderColor: "rgba(16,185,129,1)",
              backgroundColor: "rgba(16,185,129,0.1)",
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          ...baseConfig,
          scales: {
            y: {
              ticks: {
                callback: (value: any) =>
                  activeTab.value === "ride"
                    ? `${value} км/ч`
                    : `${value} мин/км`,
              },
            },
          },
        },
      });
    }

    // Elevation chart
    if (elevationChart.value) {
      const ctx = elevationChart.value.getContext("2d");
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "rgba(168,85,247,0.8)");
        gradient.addColorStop(1, "rgba(168,85,247,0.2)");

        charts.value.elevation = createChart(elevationChart.value, {
          type: "bar",
          data: {
            labels: data.map((_, i) => i + 1),
            datasets: [
              {
                data: data.map((a) => +a.total_elevation_gain.toFixed(0)),
                backgroundColor: gradient,
                borderRadius: 6,
              },
            ],
          },
          options: baseConfig,
        });
      }
    }

    // Heart rate chart
    if (heartRateChart.value) {
      charts.value.heartRate = createChart(heartRateChart.value, {
        type: "line",
        data: {
          labels: data.map((_, i) => i + 1),
          datasets: [
            {
              label: "Средний",
              data: data.map((a) => a.average_heartrate || null),
              borderColor: "rgba(251,146,60,1)",
              borderDash: [5, 5],
              tension: 0.4,
            },
            {
              label: "Макс.",
              data: data.map((a) => a.max_heartrate || null),
              borderColor: "rgba(239,68,68,1)",
              tension: 0.4,
            },
          ],
        },
        options: {
          ...baseConfig,
          plugins: {
            ...baseConfig.plugins,
            legend: { display: true },
          },
        },
      });
    }
  } finally {
    isUpdating.value = false;
    updatePromise.value = null;
  }
};

// Debounced chart update
const debouncedUpdate = debounce(() => {
  if (updatePromise.value) return;
  updatePromise.value = updateCharts();
}, 1000);

// Updated tab change handler
const handleTabChange = async (newTab: ActivityType) => {
  if (isUpdating.value) return;

  activeTab.value = newTab;
  await debouncedUpdate();
};

// Update watchers
watch(
  [activeTab],
  async () => {
    if (!isUpdating.value) {
      await debouncedUpdate();
    }
  },
  { flush: "post" }
);

// Lifecycle hooks
onMounted(() => {
  nextTick(() => updateCharts());
});

onBeforeUnmount(() => {
  destroyCharts();
});

// --- UI Helpers ---

const getTabClass = (tabName: ActivityType) => {
  const baseClass =
    "px-4 py-2 text-sm font-semibold text-white rounded-t-lg transition-all duration-300 focus:outline-none";
  if (activeTab.value === tabName) {
    return `${baseClass} bg-white/30`;
  }
  return `${baseClass} bg-white/10 hover:bg-white/20`;
};
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
  animation: slideUp 0.5s ease-out both;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
