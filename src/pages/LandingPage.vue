<template>
  <div class="landing-page">

    <!-- Hero Section -->
    <section class="hero text-center p-6">
      <h1 class="text-4xl font-bold mb-4">Train Smarter. Perform Better.</h1>
      <p class="text-lg mb-6">Приложение для спортсменов и тренеров. Легко планируй и отслеживай тренировки.</p>
      <Button label="Начать бесплатно" class="p-button-rounded p-button-lg"/>
    </section>

    <Divider/>

    <div class="grid gap-4 p-2">
      <Card style="width: 100%" class="feature-card text-center ">
        <template #title>Advanced Card</template>
        <template #subtitle>Card subtitle</template>
        <template #content>
          <p class="m-0">
            Lorem
          </p>
        </template>

      </Card>
      <Card class="feature-card">
        <template #title>
          <div class="flex items-center gap-3">
            <Avatar icon="pi pi-bullseye" shape="circle" class="bg-blue-100 text-blue-600"/>
            <span class="font-bold">Персонализированные тренировки</span>
          </div>
        </template>
        <p>
          Получите индивидуальные планы тренировок, адаптированные под ваши цели, уровень
          физической подготовки и расписание.
        </p>
      </Card>

      <Card class="feature-card">
        <template #title>
          <div class="flex items-center gap-3">
            <Avatar icon="pi pi-calendar" shape="circle" class="bg-blue-100 text-blue-600"/>
            <span class="font-bold">Удобное расписание</span>
          </div>
        </template>
        <p>
          Просматривайте ваш календарь тренировок на первый взгляд и никогда не пропускайте занятия.
        </p>
      </Card>

      <Card class="feature-card">
        <template #title>
          <div class="flex items-center gap-3">
            <Avatar icon="pi pi-chart-line" shape="circle" class="bg-blue-100 text-blue-600"/>
            <span class="font-bold">Отслеживайте прогресс</span>
          </div>
        </template>
        <p>
          Отслеживайте улучшения в вашем спортивном уровне с помощью детального анализа и инсайтов.
        </p>
      </Card>
    </div>

    <Divider/>

    <!-- Footer -->
    <footer class="text-center p-4 text-sm">
      © 2025 TrainersHub. Все права защищены.
    </footer>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import Card from "primevue/card";
import Divider from "primevue/divider";

const menuItems = ref([
  {label: "Главная"},
  {label: "Функции"},
  {label: "Цены"},
  {label: "Контакты"}
]);
</script>

<style scoped>
.landing-page {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  background: linear-gradient(135deg, #1e1e2f, #27293d);
  color: white;
  border-radius: 1rem;
}

.feature-card {
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
</style>
