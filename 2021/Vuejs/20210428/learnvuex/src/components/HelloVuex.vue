<template>
  <div>
    <h1>------HelloVuex------</h1>
    <h3>state: {{$store.state.counter}}</h3>
    <h4>getAgeMore20:{{$store.getters.getAgeMore20}}</h4>
    <h4>age>20的数量: {{$store.getters.getAgeMore20Length}}</h4>
    <h4>age用户传入：{{$store.getters.getAge(10)}}</h4>
    
  </div>
</template>

<script>
export default {
  name:'HelloVuex',
  props:{
    counter:Number
  }
}
</script>

<style>

</style>