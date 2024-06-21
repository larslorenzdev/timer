<template>
  <div>
    <input
      v-model="model"
      type="number"
    >
    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<number>()
defineProps<{
  label: string
}>()
</script>

<style lang="scss" scoped>
input {
  border: none;
  font-size: 5rem;
  width: 100%;
  padding: 0.2rem;
}
</style>
