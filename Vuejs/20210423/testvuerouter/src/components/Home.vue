<template>
<div>
  <h3>我是首页 Home</h3>
  <p>这是Home的内容</p>
  <router-link to="/home/news">新闻</router-link>
  <router-link to="/home/message">信息</router-link>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name:'Home',
  // created(){
  //   document.title = '首页';
  // }
  created(){
    console.log('Home created');
  },
  destroyed(){
    console.log('Home destroued');
  }
}
</script>

<style>

</style>