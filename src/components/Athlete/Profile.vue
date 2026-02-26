<template>
  <div class="layout-container">

    <Card v-if="stats" class="feature-card">
      <template #title>
        <div class="flex flex-column justify-content-center items-center gap-4 mb-2">
          <span>Общая статистика заездов</span>
        </div>
        <div class="flex flex-row justify-content-between gap-4 mb-2">
          <div class="flex flex-column justify-content-center items-center">

            <span class="text-base">{{ stats?.all_ride_totals.count }}</span>
            <span class="text-base">Тренировок</span>
          </div>
          <div class="flex flex-column justify-content-center items-center">
            <span class="text-base">{{ mToKm(stats?.all_ride_totals.distance) }} км</span>
            <span class="text-base">Дистанция</span>
          </div>
          <div class="flex flex-column justify-content-center items-center">
            <span class="text-base">{{ stats?.all_ride_totals.elevation_gain }} м</span>
            <span class="text-base">Набор высоты</span>
          </div>
        </div>
      </template>
    </Card>
    <Card v-if="stats" class="feature-card">
      <template #title>
        <div class="flex flex-column justify-content-center items-center gap-4 mb-2">
          <span>Общая статистика забегов</span>
        </div>
        <div class="flex flex-row justify-content-between gap-4 mb-2">
          <div class="flex flex-column justify-content-center items-center">
            <span class="text-base">{{ stats?.all_run_totals.count }}</span>
            <span class="text-base">Тренировок</span>
          </div>
          <div class="flex flex-column justify-content-center items-center">
            <span class="text-base">{{ mToKm(stats?.all_run_totals.distance) }} км</span>
            <span class="text-base">Дистанция</span>
          </div>
          <div class="flex flex-column justify-content-center items-center">
            <span class="text-base">{{ stats?.all_run_totals.elevation_gain }} м</span>
            <span class="text-base">Набор высоты</span>
          </div>
        </div>
      </template>
    </Card>
    <div v-else class="flex justify-content-center items-center h-10rem">
      <i class="pi pi-spin pi-spinner text-3xl"></i>
      <span class="ml-3">Загрузка статистики...</span>
    </div>
    <section class="flex flex-row gap-2 mb-5">
      <Card>
        <template #title>
          <div class="flex flex-column justify-content-center items-center">
            <i class="pi pi-wave-pulse text-4xl mb-2"></i>
            <span class="mb-2">272</span>
            <span class="text-base">FTP (Ватт)</span>
          </div>
        </template>
      </Card>
      <Card>
        <template #title>
          <div class="flex flex-column justify-content-center items-center">
            <i class="pi pi-arrow-circle-up text-zinc-contrast text-4xl mb-2"></i>
            <span class="mb-2">58</span>
            <span class="text-base">VO2 Max</span>
          </div>
        </template>
      </Card>
      <Card>
        <template #title>
          <div class="flex flex-column justify-content-center items-center">
            <i class="pi pi-trophy text-4xl mb-2"></i>
            <span class="mb-2">38:24</span>
            <span class="text-base">Рекорд 10км</span>
          </div>
        </template>
      </Card>
    </section>
    <Card class="feature-card">
      <template #title>
        <!--        <Button class="w-full" @click="authToStrave">Войти в страва</Button>-->
        <a href="https://www.strava.com/oauth/authorize?client_id=174332&response_type=code&redirect_uri=http://localhost:8080/AthleteDashboard/&approval_prompt=force&scope=read,activity:read_all">Войти в Strava</a>
      </template>
    </Card>
    <Card class="feature-card">
      <template #title>
        <Button class="w-full" @click="exit">Выйти</Button>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">

import Card from "primevue/card";
import {api} from "@/api";
import {router} from "@/main";
import {Routes} from "@/model/router";
import {clearAccessToken} from "@/utils/auth";
import {onMounted, ref} from "vue";
import {AllStats} from "@/model/types";
import {mToKm} from "@/utils/statsConverter";
const athleteId = sessionStorage.getItem('athleteId')
const stats = ref<AllStats>();

const CACHE_TTL = 1000 * 60 * 10; // 10 минут

onMounted(async () => {
  const cached = sessionStorage.getItem('athleteStats');
  console.log(cached);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) {
      stats.value = data;
      return;
    }
  }
  await getAthleteStats(athleteId!);
});

const getAthleteStats = async (athleteId: string) => {
  const res = await api.getStravaStats(athleteId);
  console.log(res.all_run_totals, 'res')
  if (res) {
    stats.value = res;
    sessionStorage.setItem(
        'athleteStats',
        JSON.stringify({ data: res, timestamp: Date.now() })
    );
  }
};

const exit = async () => {
  await api.exit()
  clearAccessToken()
  router.push({name: Routes.LandingPage});
}


</script>

<style scoped>

</style>