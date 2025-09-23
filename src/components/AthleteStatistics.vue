<template>
  <div class="layout-container">
    <div class="p-4">
      <!-- Пока данные загружаются -->
      <div v-if="!data">Загружаю данные...</div>

      <!-- Когда данные загружены -->
      <div v-else>
        <h2>Список активностей Strava</h2>
        <ul>
          <li
              v-for="activity in data"
              :key="activity.id"
              class=""
          >
            <div class="">
              {{ activity.sport_type }} Дистанция: {{ activity.distance }} м
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Button>Test</Button>

  </div>


</template>
<script setup lang="ts">
import {ref, onMounted} from "vue";
import {api} from "@/api";

const data = ref();
onMounted(async () => {
  data.value = await api.getStravaActivity();
  console.log(data.value, "resStrava");
});
</script>

<style scoped>

</style>
