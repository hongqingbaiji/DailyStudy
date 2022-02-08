<template>
  <div id="app">
    <router-view></router-view>
    <div class="tab-bar">
      <router-link class="abc" to="/home">首页</router-link>
      <router-link class="abc" to="/cartgory">分类</router-link>
      <router-link class="abc" to="/shop">购物车</router-link>
      <router-link class="abc" :to="'/profile/'+id">我的</router-link>
    </div>

  </div>

</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      id:123
    }
  }
}
</script>

<style scoped>
  .tab-bar {
    position: fixed;
    bottom:0;
    left: 0;
    right: 0;
    display: flex;
    height: 49px;
    line-height:49px;
    text-align: center;
    border: 1px solid #ccc;
  }
  .tab-bar .abc{
    flex:1;
    text-decoration: none;
  }
</style>


