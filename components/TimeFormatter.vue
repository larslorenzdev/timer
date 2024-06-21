<template>
  <div class="time">
    {{ formatTime(value) }}
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  value?: number
}>(), {
  value: 0,
})
</script>

<style scoped lang="scss">
.time {
  font-size: 5rem;
}
</style>
