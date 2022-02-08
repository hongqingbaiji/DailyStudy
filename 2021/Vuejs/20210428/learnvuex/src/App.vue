<template>
  <div id="app">
    <h1>------App------</h1>
    <button @click="addition">+</button>
    <button @click="subtraction">-</button>
    <button @click="addCounter(5)">+5</button>
    <button @click="addCounter(10)">+10</button>
    <button @click="addStu">添加学生</button>
    <button @click="updateInfo">修改info</button>

    <h3>mutations: {{$store.state.counter}}</h3>
    <h3>Getters: {{$store.getters.powerCounter}}</h3>
    <h4>age>20: {{$store.getters.getAgeMore20}}</h4>
    <h4>age>20的数量: {{$store.getters.getAgeMore20Length}}</h4>
    <h4>age用户传入：{{$store.getters.getAge(10)}}</h4>

    <h3>info:{{$store.state.info}}</h3>

    <hello-vuex></hello-vuex>
  </div>
</template>

<script>
import HelloVuex from './components/HelloVuex';

export default {
  name: 'App',
  methods:{
    addition(){
      this.$store.commit('increment')
    },
    subtraction(){
      this.$store.commit('decrement')
    },
    addCounter(num){
      this.$store.commit('addCounter',num)
    },
    addStu(){
      const stu = {id:114,name:'ziyan',age:30};
      this.$store.commit('addStu',stu);
    },
    updateInfo(){
      this.$store.commit('updateInfo');
    }
  },
  components:{
    HelloVuex
  },
}
</script>

<style>

</style>
