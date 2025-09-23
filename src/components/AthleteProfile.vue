<template>
  <div class="layout-container">
    <Card class="feature-card">
      <template #title>
        <div class="flex flex-column justify-content-center items-center gap-4 mb-5">
          <i class="pi pi-user" style="font-size: 2.5rem"></i>
          <span>Алексей Иванов</span>
          <p class="text-base">Спортсмен на выносливость • Возраст 28</p>
        </div>
        <div class="flex flex-row justify-content-between gap-4 mb-2">
          <div class="flex flex-column justify-content-center items-center">
            <span class="text-base"> 156</span>
            <span class="text-base">Тренировок</span>
          </div>
          <div class="flex flex-column justify-content-center items-center">
            <span class="text-base"> 8 мес</span>
            <span class="text-base">Тренируется</span>
          </div>
          <div class="flex flex-column justify-content-center items-center">
            <span class="text-base"> 12</span>
            <span class="text-base">Соревнований</span>
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
const exit = async () => {
  await api.exit()
  clearAccessToken()
  router.push({ name: Routes.LandingPage});
}

</script>

<style scoped>

</style>