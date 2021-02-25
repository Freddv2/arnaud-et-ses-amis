<template>
  <transition name="slide">
    <div v-show="active" :class="directionClass" class="carousel-item">
      <img :alt="name" :src="image">
    </div>
  </transition>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'animal',
  props: ['name', 'image', 'active', 'directionClass'],
  setup: (props) => {
    console.log(props)
  }
})
</script>

<style scoped>

</style>
