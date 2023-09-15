export default defineNuxtPlugin(async () => {
  const { data, refresh } = await useFetch("/api/links");

  return {
    provide: {
      links: data,
      refreshLinks: refresh,
    },
  };
});
