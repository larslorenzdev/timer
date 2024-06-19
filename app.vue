<template>
  <div>
    <h1>{{ interval?.title }}</h1>
    <strong>{{ formatTime(current ?? 0) }}</strong>
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
    <BaseButton
      label="Pause"
      @click="onPauseTimer"
    />
    {{ locked }}
  </div>
</template>

<script lang="ts" setup>
import useIntervalTimer from '~/composables/useIntervalTimer'
import useKeepAwake from '~/composables/useKeepAwake'

const routeQuerySeconds = useRouteQueryNumberRef('seconds', 30)
const routeQueryInterval = useRouteQueryNumberRef('interval', 1)
const routeQueryPause = useRouteQueryNumberRef('pause', 30)
const { locked, enableLock, disableLock } = useKeepAwake()
const { startTimer, stopTimer, pauseTimer, interval, current, isRunning, error } = useIntervalTimer()

function onStartTimer() {
  enableLock()
  startTimer({
    seconds: routeQuerySeconds.value,
    pause: routeQueryPause.value,
    interval: routeQueryInterval.value,
  })
}

function onStopTimer() {
  disableLock()
  stopTimer()
}

function onPauseTimer() {
  disableLock()
  pauseTimer()
}
</script>
