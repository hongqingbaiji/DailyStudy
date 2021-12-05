<template>
  <div class="app2-container">
    <h3>App2 组件</h3>

    <router-link to="/home">首页 </router-link>
    <!-- <router-link to="/movie">电影 </router-link> -->
    <router-link to="/movie/1">洛基 </router-link>
    <router-link to="/movie/2">雷神 </router-link>
    <router-link to="/movie/3">复联 </router-link>
    <router-link to="/about">关于 </router-link>
    <router-link to="/main">后台 </router-link>
    <router-link to="/login">登录 </router-link>

    <hr>
    <button @click="$router.push('/movie/1')">push</button>
    <button @click="$router.replace('/movie/2')">replace</button>
    <button @click="$router.go(2)">go</button>
    <button @click="$router.back()">back</button>
    <button @click="$router.forward()">forward</button>
    <hr>

    <router-view></router-view>
   </div>
</template>

<script>
export default {
  name: 'App2',
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.app2-container{
  background-color: #eee;
}
</style>
