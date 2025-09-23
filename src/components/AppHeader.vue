<template>
  <Menubar class="p-menubar-root sticky top-0 z-50 shadow-lg">
    <template #start>
      <div class="flex items-center gap-2">
        <span class="font-bold text-xl app-name">TrainersHub</span>
      </div>
    </template>
    <template #end>
      <div class="md:hidden">

        <Button type="button" class="topbar-theme-button" @click="toggleDarkMode" text rounded>
          <i :class="['pi ', 'pi ', { 'pi-moon': isDarkMode, 'pi-sun': !isDarkMode }]"/>
        </Button>
        <Button @click="login" icon="pi pi-sign-in" type="button" class="topbar-theme-button"/>
      </div>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import {router} from "@/main";
import {Routes} from "@/model/router";
import {useLayout} from "@/composables/useLayout"
import {checkAuth} from "@/utils/auth";

const {isDarkMode, toggleDarkMode} = useLayout();
const sidebarVisible = ref(false);


const toggleMenu = () => {
  sidebarVisible.value = !sidebarVisible.value;
};
const login = async () => {

  const isAuthorized = await checkAuth()
  if (!isAuthorized.isAuth) {
    router.push({name: Routes.AuthForm});
  } else {
    router.push({name: Routes.AthleteDashboard});
  }
}


</script>

<style scoped>
/* Стили для Menubar и Sidebar */
.p-menubar-root {

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