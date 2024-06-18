<template>
  <div>
    <h1>{{ interval?.title }}</h1>
    <strong>{{ formatTime(current) }}</strong>
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
  </div>
</template>

<script lang="ts" setup>
import useIntervalTimer from '~/composables/useIntervalTimer'
import { formatTime } from '~/utils/timeFormatter'

const routeQuerySeconds = useRouteQueryNumberRef('seconds', 30)
const routeQueryInterval = useRouteQueryNumberRef('interval', 1)
const routeQueryPause = useRouteQueryNumberRef('pause', 30)
const { startTimer, stopTimer, interval, current, isRunning } = useIntervalTimer()

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

onMounted(async () => {
  if ('wakeLock' in navigator) {
    await navigator.wakeLock.request('screen')
  }
})
</script>
