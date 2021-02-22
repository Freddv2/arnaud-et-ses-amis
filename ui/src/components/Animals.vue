<template>
  <Animal
    :name="currentAnimal.name"
    :image="currentAnimal.image"
  />
</template>

<script>
import {defineComponent} from "vue";
import Animal from "./Animal.vue";
import * as animalsData from '../data/animals.json'

export default defineComponent({
  name: "Animals",
  components: {Animal},
  setup() {
    const animals = animalsData.animals
    const currentAnimal = animals[0]
    console.log(animals)

    return {currentAnimal, animals}
  }
})
</script>

<style scoped>

</style>