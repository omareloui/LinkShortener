export default defineNuxtPlugin(async () => {
  const res = await useFetch("/api/auth/is-authed");
  const isAuthed = res.data.value;

  if (isAuthed) await useFetch("/api/auth/refresh-token");

  return {
    provide: {
      isAuthed,
    },
  };
});
