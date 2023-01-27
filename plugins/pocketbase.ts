// plugins/pocketbase.js
import PocketBase, { Record, Admin } from 'pocketbase';

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig();
  const pb = new PocketBase(config.pocketbaseHost);

  const cookie = useCookie<{ token: any; model: any }>('pb_auth', {
    path: '/',
    secure: false,
    sameSite: 'strict',
    httpOnly: false, // change to "true" if you want only server-side access
    maxAge: 604800,
  });

  // load the store data from the cookie value
  pb.authStore.save(cookie.value?.token, cookie.value?.model);
  useState<Record | Admin | null>('pocketbase_user', () => pb.authStore.model);

  // send back the default 'pb_auth' cookie to the client with the latest store state
  pb.authStore.onChange(() => {
    cookie.value = {
      token: pb.authStore.token,
      model: pb.authStore.model,
    };
  });

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    pb.authStore.isValid && (await pb.collection('users').authRefresh());
  } catch (_) {
    // clear the auth store on failed refresh
    pb.authStore.clear();
    useState<Record | Admin | null>('pocketbase_user', () => null);
  }

  return {
    provide: { pb },
  };
});
