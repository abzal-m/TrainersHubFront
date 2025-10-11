<template>
  <div class="layout-container">
    <Card class="feature-card">
      <template #title>
        <div class="flex flex-column justify-content-center items-center gap-4 mb-2">
          <span>Общая статистика заездов</span>
        </div>
        <div class="flex flex-row justify-content-between gap-4 mb-2">
          <div class="flex flex-column justify-content-center items-center">
            <span class="text-base">{{ stats?.allRideTotals.count }}</span>
            <span class="text-base">Тренировок</span>
          </div>
          <div class="flex flex-column justify-content-center items-center">
            <span class="text-base">{{ mToKm(stats?.allRideTotals.distance) }} км</span>
            <span class="text-base">Дистанция</span>
          </div>
          <div class="flex flex-column justify-content-center items-center">
            <span class="text-base">{{ stats?.allRideTotals.elevationGain }} м</span>
            <span class="text-base">Набор высоты</span>
          </div>
        </div>
      </template>
    </Card>
    <Card class="feature-card">
      <template #title>
        <div class="flex flex-column justify-content-center items-center gap-4 mb-2">
          <span>Общая статистика забегов</span>
        </div>
        <div class="flex flex-row justify-content-between gap-4 mb-2">
          <div class="flex flex-column justify-content-center items-center">
            <span class="text-base">{{ stats?.allRunTotals.count }}</span>
            <span class="text-base">Тренировок</span>
          </div>
          <div class="flex flex-column justify-content-center items-center">
            <span class="text-base">{{ mToKm(stats?.allRunTotals.distance) }} км</span>
            <span class="text-base">Дистанция</span>
          </div>
          <div class="flex flex-column justify-content-center items-center">
            <span class="text-base">{{ stats?.allRunTotals.elevationGain }} м</span>
            <span class="text-base">Набор высоты</span>
          </div>
        </div>
      </template>
    </Card>
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
        <a href="https://www.strava.com/oauth/authorize?client_id=174332&response_type=code&redirect_uri=http://localhost:8080/AthleteDashboard/&approval_prompt=force&scope=read,activity:read_all">Redirect</a>
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
import {mToKm} from "@/utils/StatsConverter";

const stats = ref<AllStats>();


onMounted(async () => {
  const athleteId = sessionStorage.getItem('athleteId')
  const statsFromJson = JSON.parse(<string>sessionStorage.getItem('athleteStats'))
  if (athleteId == null) {
    return;
  }
  if (!statsFromJson) {
    await getAthleteStats(athleteId)
  } else {
    stats.value = statsFromJson
  }
})

const getAthleteStats = async (athleteId: string) => {
  try {
    const res = await api.getStravaStats(athleteId)
    if (res.allRunTotals !== null || res.allRideTotals !== null) {
      sessionStorage.setItem('athleteStats', JSON.stringify(res));
    }
  } catch (error) {
    console.log(error);
  }
}

const exit = async () => {
  await api.exit()
  clearAccessToken()
  router.push({name: Routes.LandingPage});
}


</script>

<style scoped>

</style>