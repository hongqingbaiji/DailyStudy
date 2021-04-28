<template>
  <div id="app">
    <h3>{{message}}</h3>
    <button @click="counter++">+</button>
    {{$store.state.counter}}
    <button @click="counter--">-</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      message:'我是App的组件',
      counter:0
    }
  }
}
</script>

<style>

</style>
