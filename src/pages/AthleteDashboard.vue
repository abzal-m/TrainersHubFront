<template>
  <div class="card dock-demo">
    <div class="dock-window">
      <Dock :model="items" :position="position" :pt="{
        item: 'px-2',
        itemlink: 'w-5rem h-4rem'
      }">
        <template #itemicon="{ item }">
          <i :class="item.icon" style="font-size: 2.1rem; color: #615e5e" @click="onDockItemClick(item?.label)"></i>
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
    icon: 'pi pi-home',
    title: 'Главная',
  },
  {
    label: 'Calendar',
    icon: 'pi pi-calendar',
    title: 'Календарь',

  },
  {
    label: 'Statistics',
    icon: 'pi pi-chart-line',
    title: 'Статистика',
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
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
  background-color: #cdcdcd;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
}

.dock-demo > .p-dock {
  z-index: 1000;
}
</style>
