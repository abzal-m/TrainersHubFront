<template>

  <AppHeader v-if="view=='Calendar'"/>
  <Dock :model="items" :position="position" :pt="{
        listContainer: { class: 'bg-zinc text-zinc-contrast' },

        item: 'px-2',
        itemlink: 'w-5rem h-3rem'
      }">
    <template #itemicon="{ item }">
      <i :class="item.icon" style="font-size: 2rem" @click="onDockItemClick(item?.label)"></i>
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

<style scoped>

</style>
