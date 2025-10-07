<template>
  <div class="layout-container">
    <Card v-for="train in trainings">
      <template #content>
        <section >
          <div>{{ train.title }}</div>
          <div v-for="tr in train.segments">
            <div>Дистанция - {{tr.distanceKm}} км.</div>
            <div>Продолжительность - {{tr.durationMinutes}} мин.</div>
            <div>Каденс - {{tr.targetCadence}} об/мин</div>
            <div>Пульс - {{tr.targetHeartRate}} уд/мин</div>
          </div>
        </section>
      </template>
      <Divider/>
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
import {Trainings} from "@/model/types";
const trainings = ref<Trainings[]>([])


const getTrainings = async () => {
  trainings.value = await api.getAthleteTrainings()
}
onMounted(() => {
  getTrainings()
})


</script>

<style scoped>

</style>