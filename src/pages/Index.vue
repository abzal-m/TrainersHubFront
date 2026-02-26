<template></template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { Routes } from "@/model/router";

const router = useRouter();
router.replace({ name: Routes.LandingPage });
</script>
