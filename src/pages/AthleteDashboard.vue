<template>
  <div class="card dock-demo">
    <div class="dock-window ">
      <Dock :model="items" :position="position" :pt="{
        listContainer: 'bg-gray-100',

        item: 'px-2',
        itemlink: 'w-5rem h-4rem'
      }">
        <template #itemicon="{ item }">
          <i :class="item.icon" style="font-size: 2.1rem" @click="onDockItemClick(item?.label)"></i>
        </template>
      </Dock>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const onDockItemClick = (item: string) => {
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
.dock-demo > .dock-window {
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: rgb(255, 255, 255);
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
}

.dock-demo > .p-dock {
  z-index: 1000;
}
</style>
