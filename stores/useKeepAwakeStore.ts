import NoSleep from 'nosleep.js'
import { useEventListener } from '@vueuse/core'

export default defineStore('KeepAwake', () => {
  const locked = shallowRef(false)
  const wakeLock = shallowRef<WakeLockSentinel>()
  const wakeLockActive = shallowRef(false)
  const shouldMonkeyPatch = isBrowserOnIos()
  const noSleep = new NoSleep()

  async function enableLock() {
    if (shouldMonkeyPatch) {
      await noSleep.enable()
    }
    else {
      if ('wakeLock' in navigator) {
        wakeLock.value = await navigator.wakeLock.request('screen')

        wakeLock.value.addEventListener('release', () => {
          wakeLockActive.value = false
        })
      }
      else {
        await noSleep.enable()
      }
    }

    locked.value = true
    wakeLockActive.value = true
  }

  function disableLock() {
    wakeLock.value?.release()
    noSleep.disable()

    locked.value = false
    wakeLockActive.value = false
  }

  onUnmounted(() => {
    disableLock()
  })

  useEventListener(document, 'visibilitychange', () => {
    if (locked.value && !wakeLockActive.value) {
      return enableLock()
    }
  })

  return {
    enableLock,
    disableLock,
    locked,
  }
})
