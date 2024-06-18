export default function () {
  const wakeLock = shallowRef<WakeLockSentinel>()

  async function tryLocking() {
    if ('wakeLock' in navigator) {
      wakeLock.value = await navigator.wakeLock.request('screen')
    }
  }

  return {
    tryLocking,
    wakeLock,
  }
}
