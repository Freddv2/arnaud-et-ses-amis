<template>
    <div v-show="active" :class="directionClass"
         class="carousel-item align-items-center justify-content-center min-vh-100">
      <img :alt="name" :src="image">
      <div class="carousel-caption">
        {{ name }}
      </div>
    </div>

</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'animal',
  props: ['name', 'image', 'active', 'directionClass']
})
</script>

<style scoped>
.carousel-caption {
  margin-top: 10px;
  position: revert;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
  font-size: 70px;
}
</style>
