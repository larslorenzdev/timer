<template>
  <div class="flex flex-column gap-5">
    <h1>{{ title }}</h1>
    <TimeFormatter :value="current" />
    <TimeFormatter :value="remaining" />
    <div class="flex flex-column gap-2">
      <BaseButton
        v-if="isPaused"
        label="Resume"
        @click="onResumeTimer"
      />
      <BaseButton
        v-else
        label="Pause"
        @click="onPauseTimer"
      />
      <BaseButton
        label="Stop"
        @click="onStopTimer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const intervalTimerStore = useIntervalTimerStore()
const { interval, current, isPaused, remaining } = storeToRefs(intervalTimerStore)
const { stopTimer, pauseTimer, resumeTimer } = intervalTimerStore
const title = computed(() => {
  if (isPaused.value) {
    return 'Paused'
  }

  return interval.value?.title
})

function onStopTimer() {
  stopTimer()
}

function onResumeTimer() {
  resumeTimer()
}

function onPauseTimer() {
  pauseTimer()
}
</script>

<style scoped lang="scss">

</style>
