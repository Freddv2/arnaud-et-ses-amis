<template>
  <div>
    <div id="carouselExampleControls" class="carousel carousel-dark slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <animal v-for="animal in animals" :key="animal.id" :active="animal.active" :directionClass="directionClass"
                :image="animal.image" :name="animal.name" :sound="animal.sound"></animal>
      </div>
      <a class="carousel-control-prev" data-bs-slide="prev" data-bs-target="#carouselExampleControls" type="button"
         @click.prevent="prev">
        <span class="carousel-control-prev-icon"></span>
      </a>
      <a class="carousel-control-next" data-bs-slide="next" data-bs-target="#carouselExampleControls" type="button"
         @click.prevent="next">
        <span class="carousel-control-next-icon"></span>
      </a>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import Animal from "./Animal.vue";
import * as animalsData from '../data/animals.json'

export default defineComponent({
  name: "animals",
  components: {Animal},
  setup: () => {
    //add the active property for the carousel. Set the first animal to active
    animalsData.animals.forEach((el, i) => el.active = i === 0)
    const animals = ref(animalsData.animals)
    let directionClass = ref('')

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

    return {animals, directionClass, prev, next}
  }
})
</script>

<style scoped>

</style>
