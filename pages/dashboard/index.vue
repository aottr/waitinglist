<script setup lang="ts">
import PocketBase from 'pocketbase';
const config = useRuntimeConfig();
const pb = new PocketBase(config.pocketbaseHost);

const valid = pb.authStore.isValid;
</script>
<template>
  {{ valid }}
</template>
