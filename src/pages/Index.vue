<template></template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
router.replace({ name: "LandingPage"});
onMounted(async () => {
});
</script>
