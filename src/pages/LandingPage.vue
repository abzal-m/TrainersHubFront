<template>
  <AppHeader></AppHeader>
  <div class="layout-container">


    <!-- Hero Section -->

    <section class="text-center p-2">
      <img  class="w-full p-button-rounded" src="@/assets/images/landingTitle.png"/>
      <h1 class="text-3xl font-bold mb-4 mt-4">Умные тренировки для современных атлетов</h1>
      <p class="text-lg mb-4">Приложение для спортсменов и тренеров. Легко планируй и отслеживай тренировки.</p>
      <Button @click="toAuth" class="p-button-rounded p-button-md w-full text-sm/6 font-semibold text-white">Стартуй сейчас <span aria-hidden="true">→</span></Button>
    </section>

    <Divider/>

    <section class="text-center">
      <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Для атлетов</h2>
      <p class="text-xl md:text-2xl mb-12 text-gray-700 dark:text-gray-300">Твои суперсилы в кармане, всегда с тобой.</p>
    </section>
    <Card class="feature-card">
      <template #title>
        <div class="flex items-center gap-4 mb-2">
          <i class="pi pi-user text-3xl text-blue-500"></i>
          <span class="font-bold text-xl">Профессиональный тренер</span>
        </div>
      </template>
      <template #content>
        <span class="text-gray-700 dark:text-gray-300">Персональные тренировки, разработанные исходя из ваших уникальных целей и физических данных.</span>
      </template>
    </Card>
    <Card class="feature-card">
      <template #title>
        <div class="flex items-center gap-4 mb-3">
          <i class="pi pi-chart-line text-3xl text-green-500"></i>
          <span class="font-bold text-xl">Видимый прогресс</span>
        </div>
      </template>
      <template #content>
        <span class="text-gray-700 dark:text-gray-300">Детальная аналитика, интерактивные графики и предиктивные модели для отслеживания ваших результатов.</span>
      </template>
    </Card>
    <Card class="feature-card">
      <template #title>
        <div class="flex items-center gap-4 mb-3">
          <i class="pi pi-calendar text-3xl text-yellow-500"></i>
          <span class="font-bold text-xl">Умное расписание</span>
        </div>
      </template>
      <template #content>
        <span class="text-gray-700 dark:text-gray-300">Автоматическая адаптация под ваш ритм жизни с интеллектуальными напоминаниями и гибкими планами.</span>
      </template>
    </Card>
    <Card class="feature-card">
      <template #title>
        <div class="flex items-center gap-4 mb-3">
          <i class="pi pi-comments text-3xl text-purple-500"></i>
          <span class="font-bold text-xl">Экспертная поддержка</span>
        </div>
      </template>
      <template #content>
        <span class="text-gray-700 dark:text-gray-300">Прямая связь с вашими тренерами, мгновенные корректировки планов и оперативная обратная связь.</span>
      </template>
    </Card>
    <Divider/>

    <section class="text-center">
      <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Для тренеров</h2>
      <p class="text-xl md:text-2xl mb-12 text-gray-700 dark:text-gray-300">Управляйте командой чемпионов эффективно в одном приложении.</p>
    </section>
    <Card class="feature-card">
      <template #title>
        <div class="flex items-center gap-4 mb-3">
          <i class="pi pi-users text-3xl text-red-500"></i>
          <span class="font-bold text-xl">Команда атлетов под контролем</span>
        </div>
      </template>
      <template #content>
        <span class="text-gray-700 dark:text-gray-300">Централизованное управление всеми вашими подопечными и их тренировочными планами.</span>
      </template>
    </Card>
    <Card class="feature-card">
      <template #title>
        <div class="flex items-center gap-4 mb-3">
          <i class="pi pi-chart-pie text-3xl text-cyan-500"></i>
          <span class="font-bold text-xl">Аналитика результатов команды</span>
        </div>
      </template>
      <template #content>
        <span class="text-gray-700 dark:text-gray-300">Глубокий анализ производительности каждого атлета и всей команды в целом.</span>
      </template>
    </Card>

    <Divider/>
    <section style="border-radius: 10px" class="text-center bg-blue-600 p-3 text-white">
      <h2 class="text-3xl font-extrabold">Готовы изменить свои тренировки?</h2>
      <p class="text-lg mb-5 opacity-90">
        Присоединяйтесь к TrainersHub сегодня и откройте для себя новый уровень спортивных достижений.
      </p>
      <Button
          @click="toAuth"
          label="Начать сейчас →"
          class="p-button-rounded p-button-lg bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 text-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
      />
    </section>

    <footer class="text-center p-6 mt-12 text-sm text-gray-600 dark:text-gray-400">
      © 2025 TrainersHub. Все права защищены.
    </footer>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";
import Divider from "primevue/divider";
import {router} from "@/main";
import {Routes} from "@/model/router";

const toAuth = () => {
  router.push({name: Routes.AuthForm});
}
</script>

