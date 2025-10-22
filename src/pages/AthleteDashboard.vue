<template>
<Home v-if="view == 'Home'"/>
  <Calendar v-if="view == 'Calendar'" />
  <Profile v-if="view == 'Profile'" />
  <Statistics v-if="view == 'Statistics'" />
  <Dock :model="items" :position="position" style="position: fixed;" :pt="{
    root: { class: 'bg-zinc text-zinc-contrast' },
    listContainer: { class: 'bg-zinc text-zinc-contrast' },
    item: 'px-2 py-2',
    itemlink: 'w-5rem h-3rem'
  }">
    <template #itemicon="{ item }">
      <i :class="item.icon" style="font-size: 2rem" @click="onDockItemClick(item?.label)"></i>
    </template>
  </Dock>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Statistics from "@/components/Athlete/Statistics.vue";
import { api } from "@/api";
import { router } from "@/main";
import { Routes } from "@/model/router";
import Home from "@/components/Athlete/Home.vue";
const view = ref('Home');
const code = ref('')

const onDockItemClick = (item: string) => {
  view.value = item
  console.log(item)
};

onMounted(async () => {
  const isConnected = await api.isConnectToStrava()
  if (!isConnected) {
    await authToStrava()
  } else {
    const res = await api.getStravaActivity();
    if (!Array.isArray(res)) {
      return
    } else {
      const athleteId = res[0].athlete.id;
      sessionStorage.setItem('athleteId', athleteId);
      sessionStorage.setItem('activities', JSON.stringify(res));
    }
  }

})

const authToStrava = async () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  code.value = params.get("code") ?? '';
  await api.stravaAuth(code.value)
}

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home text-zinc-contrast',
    title: 'Главная',
  },
  {
    label: 'Calendar',
    icon: 'pi pi-calendar text-zinc-contrast',
    title: 'Календарь',

  },
  {
    label: 'Statistics',
    icon: 'pi pi-chart-line text-zinc-contrast',
    title: 'Статистика',
  },
  {
    label: 'Profile',
    icon: 'pi pi-user text-zinc-contrast',
    title: 'Профиль',
  }
]);
const position = ref('bottom');

</script>

<style scoped></style>
