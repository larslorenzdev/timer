<template>
  <div class="flex flex-column align-items-center justify-content-center absolute top-0 bottom-0 right-0 left-0">
    <TimerRunner v-if="isRunning || isPaused" />
    <TimerSettings v-else />
  </div>
</template>

<script lang="ts" setup>
const { isRunning, isPaused } = storeToRefs(useIntervalTimerStore())
</script>
