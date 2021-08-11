<template>
  <h1>{{ msg }}</h1>

  <Button
    @click="inc"
  >
    count is: {{ count }}
  </Button>
</template>

<script setup>
import { defineProps, ref } from 'vue'

defineProps({
  msg: {
    type: String,
    required: true,
  },
})

const count = ref(0)
const inc = () => {
  count.value++
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
