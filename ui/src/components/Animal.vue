<template>
    <div v-show="active" :class="directionClass"
         class="carousel-item align-items-center justify-content-center max-he">
      <img :alt="name" :src="imgPath">
      <div class="carousel-caption">
        {{ name }}
      </div>
      <div class="d-grid col-3 mx-auto">
        <button class="btn btn-primary btn-lg" type="button" @click="playSound">
          <i class="fas fa-volume-up" style="font-size: 3em;"></i>
        </button>
      </div>
    </div>

</template>

<script>
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: 'animal',
  props: ['name', 'image', 'sound', 'active', 'directionClass'],
  setup: (props) => {
    const imgPath = computed(() => 'assets/images/' + props.image)
    const soundPath = computed(() => 'assets/sounds/' + props.sound)

    function playSound() {
      new Audio(soundPath.value).play()
    }

    return {imgPath, soundPath, playSound}
  }
})
</script>

<style scoped>
.carousel-caption {
  position: revert;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
  font-size: 45px;
}

.carousel-item {

}
</style>
