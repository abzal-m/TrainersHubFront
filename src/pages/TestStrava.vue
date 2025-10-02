<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-50">
    <div class="flex justify-around items-center">
      <Button
          icon="pi pi-home"
          label="Главная"
          text
          @click="$emit('navigate', 'home')"
          class="flex-1 !rounded-none py-3"
      />
      <Button
          icon="pi pi-chart-line"
          label="Календарь"
          text
          @click="$emit('navigate', 'stats')"
          class="flex-1 !rounded-none py-3"
      />
      <Button
          icon="pi pi-plus-circle"
          label="Статистика"
          text
          @click="$emit('navigate', 'add')"
          class="flex-1 !rounded-none py-3"
      />
      <Button
          icon="pi pi-user"
          label="Профиль"
          text
          @click="$emit('navigate', 'profile')"
          class="flex-1 !rounded-none py-3"
      />
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
</script>

<style scoped>
/* Кнопки без скруглений и равной ширины */
.p-button {
  flex-direction: column; /* иконка сверху, текст снизу */
}
.p-button-label {
  font-size: 0.75rem; /* меньше текста */
}
</style>
