<template>
  <div id="app">
    <h3>{{message}}</h3>
    <button @click="addition">+</button>
    {{$store.state.counter}}
    <button @click="subtraction">-</button>

    <hello-vuex></hello-vuex>
  </div>
</template>

<script>
import HelloVuex from './components/HelloVuex';

export default {
  name: 'App',
  data(){
    return{
      message:'我是App的组件',
    }
  },
  methods:{
    addition(){
      this.$store.commit('increment')
    },
    subtraction(){
      this.$store.commit('decrement')
    }
  },
  components:{
    HelloVuex
  },
}
</script>

<style>

</style>
