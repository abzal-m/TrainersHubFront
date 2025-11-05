<template>
  <div>
    <div class="flex items-center justify-between bg-white">
      <div>
        <h1 class="text-md font-bold text-gray-900">Мои атлеты</h1>
      </div>
      <div>
        <Button class="text-sm" label="Добавить атлета" icon="pi pi-plus" iconPos="left"/>
      </div>
    </div>
    <div v-for="athlete in athletes" :key="athlete.id" class="my-3">
      <Card class="rounded-xl shadow-lg">
        <template #content>
          <div class="flex items-start justify-between">
            <div class="flex flex-column">
              <div class="text-md font-bold text-gray-700 mb-2">{{ athlete.username }}</div>
              <div class="text-sm text-gray-500">Триатлон</div>
            </div>
            <div class="flex flex-row items-center-safe">
              <div class="flex flex-column items-end mr-3">
                <div class="text-md font-bold text-gray-700">92%</div>
                <div class="text-sm text-gray-500">Успевамость</div>
              </div>
              <div>
                <i class="pi pi-angle-right"></i>
              </div>
            </div>
          </div>

        </template>
      </Card>


    </div>
  </div>
</template>

<script setup lang="ts">

import {MyAthlete} from "@/model/types";
import {computed, defineProps, onMounted, ref, watchEffect} from 'vue';

const props = defineProps(
    ['athletes']
)
const athletes = ref<MyAthlete[]>([])


watchEffect(() => {
  athletes.value = props.athletes
})
onMounted(() => {

})

</script>

<style scoped>

</style>