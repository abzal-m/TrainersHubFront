<script setup>
import { useLayout } from "@/composables/useLayout.js";
import AppConfig from "@/components/AppConfig.vue";

const { isDarkMode, toggleDarkMode } = useLayout();
</script>

<template>
  <div class="topbar">
    <div class="topbar-container">

      <div class="topbar-actions">
        <Button type="button" class="topbar-theme-button" @click="toggleDarkMode" text rounded>
          <i :class="['pi ', 'pi ', { 'pi-moon': isDarkMode, 'pi-sun': !isDarkMode }]" />
        </Button>
        <div class="relative">
          <Button
              v-styleclass="{
                            selector: '@next',
                            enterFromClass: 'hidden',
                            enterActiveClass: 'animate-scalein',
                            leaveToClass: 'hidden',
                            leaveActiveClass: 'animate-fadeout',
                            hideOnOutsideClick: true,
                        }"
              icon="pi pi-cog"
              text
              rounded
              aria-label="Settings"
          />
          <AppConfig />
        </div>
      </div>
    </div>
  </div>
</template>