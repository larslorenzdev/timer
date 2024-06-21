<template>
  <button type="button">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<style lang="scss" scoped>
button {
  border: solid 2px #e2e2e2;
  background-color: #00dc82;
  color: #000000;
  border-radius: 1rem;
  width: 8rem;
  padding: 0.6rem;

  &:hover{
    cursor: pointer;
    background-color: #22a571;
  }
}
</style>
