<template>
  <div class="about-container">
    <h3>About 组件</h3>
    <router-link to="/about">tab1</router-link>
    <router-link to="/about/tab2">tab2</router-link>
    <hr>
    <router-view></router-view>
   </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.about-container{
  height: 300px;
  background-color:lightcoral;
  padding:10px;
}
</style>
