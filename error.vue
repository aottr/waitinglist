<script setup lang="ts">
const error = useError() as any;
</script>

<template>
  <div class="flex h-screen justify-center items-center flex-col">
    <h1 class="text-9xl">{{ error.statusCode }}</h1>
    <p class="mt-7 text-3xl">{{ error.message }}</p>
  </div>
</template>
