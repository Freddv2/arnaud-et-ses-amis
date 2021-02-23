<template>
  <div class="row">
    <div class="column">
      <button
    </div>
    <div class="column">
      <Animal
          :image="animals[animalIndex].image"
          :name="animals[animalIndex].name"
      />
    </div>
    <div class="column"></div>
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
    const animals = ref(animalsData.animals)
    const index = ref(0)

    function nextAnimals() {
      if (index.value === animals.value.length - 1) {
        index.value = 0;
      } else {
        index.value++
      }
    }

    function previousAnimals() {
      if (index.value === 0) {
        index.value = animals.value.length - 1;
      } else {
        index.value--
      }
    }

    return {animals, nextAnimals, previousAnimals}
  }
})
</script>

<style scoped>

</style>
