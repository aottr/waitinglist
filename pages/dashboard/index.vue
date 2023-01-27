<script setup lang="ts">
const products = await useAsyncData('products-key', async (app) => {
  //const pb = await usePocketbase();
  const pb = app?.$pb;
  const products = await pb!.collection('products').getFullList(undefined, {
    expand: 'owner',
    $autoCancel: false,
  });
  return structuredClone(products);
});
const refresh = () => refreshNuxtData('products-key');
</script>
<template>
  {{ products }}
  <button class="btn" v-on:click="refresh">Refresh</button>
</template>
