<template>
  <h1>{{ name }}</h1> 
  <img
    :src="image"
    alt=""
  >
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'Animal',
  props: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    soundURL: { 
      type: String,
      required: false
    }
  },
  setup: (props) => {
    console.log(props)
  }
})
</script>

<style scoped>

</style>
