export default defineNuxtPlugin(async () => {
  const [, setAuthState] = useAuthState("not-authed");

  const res = await useFetch("/api/auth/is-authed");
  const isAuthed = res.data.value;

  if (isAuthed) {
    await useFetch("/api/auth/refresh-token");
    setAuthState("is-authed");
  }
});
