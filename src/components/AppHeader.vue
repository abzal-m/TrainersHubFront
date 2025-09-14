<template>
  <Menubar class="p-menubar-root sticky top-0 z-50 shadow-md">
    <template #start>
      <div class="flex items-center gap-2">
        <span class="font-bold text-xl app-name">TrainersHub</span>
      </div>
    </template>
    <template #end>
      <div class="md:hidden">
        <Button icon="pi pi-bars" class="p-button-text p-button-secondary" @click="toggleMenu" />
      </div>
    </template>
  </Menubar>

  <Sidebar v-model:visible="sidebarVisible" position="right">
    <template #header>
      <div class="flex items-center gap-2">
        <span class="font-bold text-xl">TrainersHub</span>
      </div>
    </template>
    <Button label="Войти" class="p-button-text p-button-secondary w-full justify-start pl-3 py-2" />
    <Button label="Регистрация" class="p-button-primary p-button-rounded w-full justify-start pl-3 py-2 mt-2" />


  </Sidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import Divider from 'primevue/divider';

const sidebarVisible = ref(false);

const items = ref([
  {
    label: 'Главная',
    icon: 'pi pi-home',
    url: '#hero' // Пример ссылки на секцию
  },
  {
    label: 'Для атлетов',
    icon: 'pi pi-user',
    url: '#athletes'
  },
  {
    label: 'Для тренеров',
    icon: 'pi pi-users',
    url: '#coaches'
  },
  {
    label: 'Контакты',
    icon: 'pi pi-envelope',
    url: '#contact'
  }
]);

const toggleMenu = () => {
  sidebarVisible.value = !sidebarVisible.value;
};
</script>

<style scoped>
/* Стили для Menubar и Sidebar */
.p-menubar-root {
  background-color: var(--surface-0); /* Используем переменную темы PrimeVue для фона */
  border-bottom: 1px solid var(--surface-border); /* Легкая граница */
  padding: 0.75rem 1.5rem; /* Отступы */
}

.p-menubar .p-menubar-start .app-name {
  color: var(--text-color); /* Цвет текста названия приложения */
}

/* Стили для ссылок в сайдбаре, чтобы они выглядели как пункты меню */
.p-sidebar .p-sidebar-content ul a {
  color: var(--text-color);
  text-decoration: none;
}
.p-sidebar .p-sidebar-content ul a:hover {
  background-color: var(--surface-hover);
}
</style>