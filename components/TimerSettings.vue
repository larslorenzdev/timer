<template>
  <div class="flex flex-column align-items-center">
    <div class="flex gap-2">
      <BaseInput
        v-model="routeQuerySeconds"
        label="Interval"
      />
      <BaseInput
        v-model="routeQueryPause"
        label="Pause"
      />
      <BaseInput
        v-model="routeQueryInterval"
        label="Times"
      />
    </div>
    <BaseButton
      label="Start"
      @click="onStartTimer"
    />
  </div>
</template>

<script setup lang="ts">
const routeQuerySeconds = useRouteQueryNumberRef('seconds', 30)
const routeQueryInterval = useRouteQueryNumberRef('interval', 1)
const routeQueryPause = useRouteQueryNumberRef('pause', 30)
const { startTimer } = useIntervalTimerStore()

function onStartTimer() {
  startTimer({
    seconds: routeQuerySeconds.value,
    pause: routeQueryPause.value,
    interval: routeQueryInterval.value,
  })
}
</script>

<style lang="scss" scoped>

</style>
