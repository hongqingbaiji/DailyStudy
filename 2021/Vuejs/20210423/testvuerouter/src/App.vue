<template>
  <div id="app">
    <router-link to="/home" tag="button" >首页</router-link>
    <router-link to="/about" tag="button" >关于</router-link>
    <router-link :to="'/user/'+uid" tag="button" >用户</router-link>
    <router-link :to="{path:'/profile',query:{name:'wenhe',age:18,sex:'男'}}" tag="button" >
    档案</router-link>

    <!-- <button @click="userClick">用户</button>
    <button @click="profileClick">档案</button> -->

    <keep-alive exclude="Profile">
      <router-view></router-view>
    </keep-alive>

    <!-- <button @click="homeClick">首页</button>
    <button @click="aboutClick">关于</button>
    <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      uid:'wenhe'
    }
  },
  methods:{
    // homeClick(){
    //   this.$router.push('/home');
    // },
    // aboutClick(){
    //   this.$router.push('/about');
    // }

    // userClick(){
    //   this.$router.push('/user/'+this.uid);
    // },
    // profileClick(){
    //   this.$router.push({
    //     path:'/profile',
    //     query:{
    //       name:'wenhe',
    //       age:18,
    //       sex:'男'
    //     }
    //   });
    // }
  }
}
</script>

<style>
  .active{
    color:red;
  }
</style>
