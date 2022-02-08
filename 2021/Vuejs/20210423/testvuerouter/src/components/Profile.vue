<template>
  <div>
    <h3>我是profile组件</h3>
    <h4>姓名：{{ $route.query.name }}---年龄：{{ $route.query.age }}---性别：{{ $route.query.sex }}</h4>
    <h4></h4>
    <h4></h4>
  </div>
</template>

<script>
export default {
  name:'Profile',
  created(){
    console.log('profile created');
  },
  destroyed(){
    console.log('profile destroued');
  }
}

</script>

<style>

</style>