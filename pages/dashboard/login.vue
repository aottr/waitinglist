<script setup lang="ts">
const redirectUrl = 'http://localhost:3000/dashboard/redirect';
const { data } = await useAsyncData(async (app) => {
  return app?.$pb.collection('users').listAuthMethods();
});

const authProviders = data.value?.authProviders;
const google = ref(
  authProviders?.find((provider) => provider.name === 'google')
);
const cookie = useCookie('auth');
cookie.value = google?.value?.codeVerifier || '';
</script>
<template>
  <div class="mt-10">
    <h1 class="text-5xl font-bold mb-7">Log in</h1>
    <a v-if="google" :href="google.authUrl + redirectUrl" class="btn btn-error"
      >Login with google</a
    >
  </div>
</template>
