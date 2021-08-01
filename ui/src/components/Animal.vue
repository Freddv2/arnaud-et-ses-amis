<template>
    <div v-show="active" :class="directionClass"
         class="carousel-item align-items-center justify-content-center max-he">
      <div class="carousel-caption">
        {{ name }}
      </div>
      <img :alt="name" :src="imgPath">
      <br/><br/>
      <div v-if="hasSound()" class="d-grid col-3 mx-auto">
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

    function playSound() {
      props.sound.play()
    }
    
    function hasSound() {
      return props.sound
    }

    return {imgPath, playSound, hasSound}
  }
})
</script>

<style scoped>
.carousel-caption {
  position: revert;
  padding-top: revert;
  font-size: 45px;
  font-family: 'Verdana', serif;
  color: black
}

</style>
