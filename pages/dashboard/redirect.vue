<script setup lang="ts">
import PocketBase from 'pocketbase';
const config = useRuntimeConfig();

interface GoogleQuery {
  state: string;
  code: string;
}
const query = useRoute().query as unknown as GoogleQuery;

const pb = new PocketBase(config.pocketbaseHost);
const redirectUrl = 'http://localhost:3000/dashboard/redirect';
const cookie = useCookie('auth');

const auth = await pb.collection('users').authWithOAuth2(
  'google',
  query.code,
  cookie.value || '',
  redirectUrl,
  // pass optional user create data
  {
    emailVisibility: false,
  }
);
cookie.value = null;

if (auth.token) navigateTo(`/dashboard`);
</script>
<template>
  {{ auth }}
</template>
