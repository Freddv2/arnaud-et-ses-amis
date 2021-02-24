<template>
  <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <Animal
            :image="animals[animalIndex].image"
            :name="animals[animalIndex].name"
        />
      </div>
      <a class="carousel-control-prev" data-slide="prev" href="#carouselExampleControls" role="button" @click.prevent="prev">
        <span aria-hidden="true" class="carousel-control-prev-icon"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" data-slide="next" href="#carouselExampleControls" role="button" @click.prevent="next">
        <span aria-hidden="true" class="carousel-control-next-icon"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

  </div>
  <div class="row">
    <div class="column">
      <button @click="previousAnimals"/>
    </div>
    <div class="column">

    </div>
    <div class="column">
      <button @click="nextAnimals"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import Animal from "./Animal.vue";
import * as animalsData from '../data/animals.json'

export default defineComponent({
  name: "Animals",
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

    return {animals, prev, next}
  }
})
</script>

<style scoped>

</style>
