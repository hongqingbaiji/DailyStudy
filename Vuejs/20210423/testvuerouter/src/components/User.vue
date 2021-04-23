<template>
<div>
  <h3>我是用户界面User</h3>
  <p>这是User的内容</p>
  <h3>Hello,{{uid}}</h3>
</div>
</template>

<script>
export default {
  name:'User',
  computed:{
    uid(){
      return this.$route.params.uid;
    }
  }
}
</script>

<style>

</style>