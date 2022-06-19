export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  if (!config.public.isProd || !("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("/sw.js");
});
