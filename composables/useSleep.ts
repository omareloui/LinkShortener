export function useSleep() {
  return (ms?: number) => new Promise(res => setTimeout(res, ms));
}
