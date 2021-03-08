<template>
  <div class="container-fluid px-0">
    <animals/>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import Animals from "./components/Animals.vue";

export default defineComponent({
  name: 'App',
  components: {
    Animals,
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
