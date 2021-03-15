<template>
  <div>
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <animal v-for="animal in animals" :key="animal.id" :active="animal.active" :directionClass="directionClass"
                :image="animal.image" :name="animal.name" :sound="animal.loadedSound"></animal>
      </div>
      <a class="carousel-control-prev" data-bs-slide="prev" data-bs-target="#carouselExampleControls"
         @click.prevent="prev">
        <span style="font-size: 100px; color: black;">
         <i class="fas fa-angle-left"></i>
        </span>
      </a>
      <a class="carousel-control-next" data-bs-slide="next" data-bs-target="#carouselExampleControls"
         @click.prevent="next">
        <span style="font-size: 100px; color: black;">
         <i class="fas fa-angle-right"></i>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import Animal from "./Animal.vue";
import * as animalsData from '../data/animals.json'
import * as utils from './../utils/utils.js'

export default defineComponent({
  name: "animals",
  components: {Animal},
  setup: () => {

    const animals = ref(animalsData.animals)
    let directionClass = ref('')

    const activeIndex = utils.random(0, animals.value.length - 1)
    //add the active property for the carousel. Set a random animal to active
    animals.value.forEach((el, i) => el.active = i === activeIndex)

    function getActiveIndex() {
      return animals.value.findIndex(el => el.active)
    }

    function prev() {
      const currentActiveIndex = getActiveIndex()
      let newActiveIndex = currentActiveIndex - 1
      if (newActiveIndex < 0) {
        newActiveIndex = animals.value.length - 1;
      }
      animals.value[currentActiveIndex].active = false
      animals.value[newActiveIndex].active = true
      directionClass.value = 'slide-prev';
    }

    function next() {
      const currentActiveIndex = getActiveIndex()
      let newActiveIndex = currentActiveIndex + 1
      if (newActiveIndex > animals.value.length - 1) {
        newActiveIndex = 0;
      }
      animals.value[currentActiveIndex].active = false
      animals.value[newActiveIndex].active = true
      directionClass.value = 'slide-next';
    }

    animals.value.forEach(el => {
      let audio = new Audio('assets/sounds/' + el.sound)
      audio.preload = 'auto'
      el.loadedSound = audio
    })

    return {animals, directionClass, prev, next}
  }
})
</script>

<style scoped>
</style>
