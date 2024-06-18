<template>
  <div>
    <h1>{{ interval?.title }}</h1>
    <strong>{{ formatTime(current) }}</strong>
    <code>{{ error?.message }}</code>
    <BaseInput
      v-model="routeQuerySeconds"
      :disabled="isRunning"
    />
    <BaseInput
      v-model="routeQueryPause"
      :disabled="isRunning"
    />
    <BaseInput
      v-model="routeQueryInterval"
      :disabled="isRunning"
    />
    <BaseButton
      label="Start"
      :disabled="isRunning"
      @click="onStartTimer"
    />
    <BaseButton
      label="Stop"
      @click="onStopTimer"
    />

    <audio
      ref="audio"
      hidden
    >
      <source
        src="~/assets/beep.mp3"
        type="audio/mpeg"
      >
    </audio>
  </div>
</template>

<script lang="ts" setup>
import useIntervalTimer from '~/composables/useIntervalTimer'
import { formatTime } from '~/utils/timeFormatter'

const routeQuerySeconds = useRouteQueryNumberRef('seconds', 30)
const routeQueryInterval = useRouteQueryNumberRef('interval', 1)
const routeQueryPause = useRouteQueryNumberRef('pause', 30)
const { startTimer, stopTimer, interval, current, isRunning, error } = useIntervalTimer()
const audio = shallowRef()

function onStartTimer() {
  startTimer({
    seconds: routeQuerySeconds.value,
    pause: routeQueryPause.value,
    interval: routeQueryInterval.value,
  })
}

function onStopTimer() {
  stopTimer()
}

function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod',
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
}

onMounted(async () => {
  if ('wakeLock' in navigator) {
    await navigator.wakeLock.request('screen')
  }

  await navigator.mediaDevices.getUserMedia({ audio: true, video: false })

  audio.value?.play()
})
</script>
