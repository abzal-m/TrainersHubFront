<template>
  <AppTopbar v-if="view=='Home'"/>
  <AppHeader v-if="view=='Calendar'"/>
  <Dock :model="items" :position="position" :pt="{
        listContainer: 'bg-gray-100',

        item: 'px-2',
        itemlink: 'w-5rem h-4rem'
      }">
    <template #itemicon="{ item }">
      <i :class="item.icon" style="font-size: 2.1rem" @click="onDockItemClick(item?.label)"></i>
    </template>
  </Dock>
</template>

<script lang="ts" setup>
import {ref} from "vue";
const view = ref('Home');

const onDockItemClick = (item: string) => {
  view.value = item
  console.log(item)
};

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home text-blue-700',
    title: 'Главная',
  },
  {
    label: 'Calendar',
    icon: 'pi pi-calendar text-blue-700',
    title: 'Календарь',

  },
  {
    label: 'Statistics',
    icon: 'pi pi-chart-line text-blue-700',
    title: 'Статистика',
  },
  {
    label: 'Profile',
    icon: 'pi pi-user text-blue-700',
    title: 'Профиль',
  }
]);
const position = ref('bottom');

</script>

<style scoped>

</style>
