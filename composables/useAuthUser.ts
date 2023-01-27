export const useAuthUser = (): { token: string } => {
  const user = useCookie<{ token?: string }>('pb_auth');
  const token = user.value ? user.value['token'] : '';
  return {
    token: user.value ? user.value['token'] || '' : '',
  };
};
