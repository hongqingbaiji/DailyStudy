<template>
  <div class="movie-container">
    <h3>Movie 组件 ---{{mid}}---{{ $route.params.mid}}</h3>
    <button @click="printThis">打印 this</button>
   </div>
</template>

<script>
export default {
  name: 'Movie',
  data() {
    return {
    }
  },
  props: ['mid'],
  methods: {
    printThis() {
      console.log(this)
    }
  }
}
</script>

<style scoped>
.movie-container{
  height: 200px;
  background-color: skyblue;
  padding:10px;
}
</style>
