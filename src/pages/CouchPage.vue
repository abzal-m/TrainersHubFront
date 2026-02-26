<template>
  <div class="min-h-screen bg-gray-50 p-3">
    <!-- Header -->
    <div class="mx-auto mb-2">
      <div class="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{{ trainerName }}</h1>
          <p class="text-sm text-gray-500 mt-1">{{ localeDateString }}</p>
        </div>
        <div>
          <Button class="text-sm" label="Secondary" severity="secondary" @click="exit">Выход</Button>
        </div>
      </div>
    </div>
    <div class="card">
      <Tabs value="0">
        <TabList>
          <Tab value="0">Главная</Tab>
          <Tab value="1">Атлеты</Tab>
          <Tab value="2">Тренировки</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <Main :athletes="myAthletes"/>
          </TabPanel>
          <TabPanel value="1">
            <Athletes :athletes="myAthletes"/>
          </TabPanel>
          <TabPanel value="2">
            <p class="m-0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
              atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
              sunt in culpa
              qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
              expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
              minus.
            </p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import Athletes from "@/components/Couch/Athletes.vue";
import Main from "@/components/Couch/Main.vue";
import { localeDateString } from "@/utils/formatters";
import { api } from "@/api/index";
import { onMounted, ref } from "vue";
import type { MyAthlete } from "@/model/types";
import { clearAccessToken } from "@/utils/auth";
import { router } from "@/main";
import { Routes } from "@/model/router";

const myAthletes = ref<MyAthlete[]>([]);
const trainerName = sessionStorage.getItem('Name') ?? 'Тренер';

onMounted(async () => {
  myAthletes.value = await api.getMyAthletes();
});

const exit = async () => {
  await api.exit();
  clearAccessToken();
  await router.push({ name: Routes.LandingPage });
};
</script>