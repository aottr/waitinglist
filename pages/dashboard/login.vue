<script setup lang="ts">
import PocketBase from 'pocketbase';
const config = useRuntimeConfig();

const pb = new PocketBase(config.pocketbaseHost);
const redirectUrl = 'http://localhost:3000/dashboard/redirect';
const authProviders = (await pb.collection('users').listAuthMethods())
  .authProviders;
const google = authProviders.find((provider) => provider.name === 'google');
const cookie = useCookie('auth');
cookie.value = google?.codeVerifier || '';
</script>
<template>
  <div class="mt-10">
    <h1 class="text-5xl font-bold mb-7">Log in</h1>
    <a v-if="google" :href="google.authUrl + redirectUrl" class="btn btn-error"
      >Login with google</a
    >
  </div>
</template>
