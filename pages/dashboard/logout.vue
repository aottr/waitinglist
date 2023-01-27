<script setup lang="ts">
const pb = useNuxtApp().$pb;
pb.authStore.clear();

navigateTo('/', { external: true });
</script>
<template></template>
