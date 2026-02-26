<template>
  <component :is="views[view]" />
  <Dock
    :model="items"
    position="bottom"
    style="position: fixed;"
    :pt="dockPt"
  >
    <template #itemicon="{ item }">
      <i :class="item.icon" style="font-size: 2rem" @click="view = item.label" />
    </template>
  </Dock>
</template>

<script lang="ts" setup>
import { onMounted, ref, markRaw } from "vue";
import { api } from "@/api";
import Home from "@/components/Athlete/Home.vue";
import Calendar from "@/components/Athlete/Calendar.vue";
import Profile from "@/components/Athlete/Profile.vue";
import Statistics from "@/components/Athlete/Statistics.vue";

type ViewKey = 'Home' | 'Calendar' | 'Statistics' | 'Profile';

const view = ref<ViewKey>('Home');

const views = {
  Home: markRaw(Home),
  Calendar: markRaw(Calendar),
  Statistics: markRaw(Statistics),
  Profile: markRaw(Profile),
};

const items = [
  { label: 'Home',       icon: 'pi pi-home text-zinc-contrast',       title: 'Главная' },
  { label: 'Calendar',   icon: 'pi pi-calendar text-zinc-contrast',   title: 'Календарь' },
  { label: 'Statistics', icon: 'pi pi-chart-line text-zinc-contrast', title: 'Статистика' },
  { label: 'Profile',    icon: 'pi pi-user text-zinc-contrast',       title: 'Профиль' },
];

const dockPt = {
  root: { class: 'bg-zinc text-zinc-contrast' },
  listContainer: { class: 'bg-zinc text-zinc-contrast' },
  item: 'px-2 py-2',
  itemlink: 'w-5rem h-3rem',
};

onMounted(async () => {
  const { isConnected } = await api.isConnectToStrava();
  if (!isConnected) {
    const code = new URLSearchParams(window.location.search).get('code') ?? '';
    await api.stravaAuth(code);
  } else {
    const activities = await api.getStravaActivity();
    if (Array.isArray(activities)) {
      sessionStorage.setItem('athleteId', activities[0].athlete.id);
      sessionStorage.setItem('activities', JSON.stringify(activities));
    }
  }
});
</script>

<style scoped></style>
