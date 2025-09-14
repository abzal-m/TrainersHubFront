<script setup lang="ts">
import {computed, ref} from "vue";
import Card from "primevue/card";
import Button from "primevue/button";

const tabs = [{title: 'Login', value: 'Login', content: 'content1'}, {
  title: 'Register',
  value: 'Register',
  content: 'content2'
}]
</script>

<template>
  <div class="layout-container">
    <div class="flex flex-col items-center justify-center w-full p-2">
      <img class="w-6 p-1 mx-c" style="border-radius: 50%" src="@/assets/images/logo.png" alt=""/>
      <div>
        <p class="text-2xl font-bold text-center">Войдите в вашу тренировочную платформу</p>
      </div>
    </div>
    <Card class="mb-2">

      <template #content>
        <Tabs value='Login' scrollable>
          <TabList>
            <Tab class="w-6" v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>

          </TabList>
          <TabPanels>
            <TabPanel v-for="tab in tabs" :key="tab.content" :value="tab.value">
              <p class="m-0">{{ tab.content }}</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </template>
    </Card>
  </div>
</template>

<style scoped>

</style>