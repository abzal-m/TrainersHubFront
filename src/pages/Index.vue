<template></template>
<script setup lang="ts">
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {Routes} from "@/model/router";
import { useLayout } from "@/composables/useLayout.js";
import AppConfig from "@/components/AppConfig.vue";



const router = useRouter();
router.replace({name: Routes.LandingPage});
onMounted(async () => {

});

</script>
