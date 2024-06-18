<template>
  <input
    v-model="model"
    type="number"
  >
</template>

<script setup lang="ts">
const model = defineModel<number>()
</script>

<style lang="scss" scoped>

</style>
