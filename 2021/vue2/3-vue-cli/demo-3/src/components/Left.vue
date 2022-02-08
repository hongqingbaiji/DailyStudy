<template>
  <div class="left">
    <h3>这是Left组件---{{ count }}</h3>
    <hr>
    <button @click="count++">+1</button>
  </div>
</template>

<script>
export default {
  name: 'Left',
  components: {},
  data() {
    return {
      count:0
    }
  },
  created(){
    console.log('组件被创建了');
  },
  destroyed(){
    console.log('组件被销毁了');
  },
  activated(){
    console.log('组件被激活了');
  },
  deactivated(){
    console.log('组件被缓存了');
  }
}
</script>

<style scoped>
  .left{
    height: 200px;
    background-color: pink;
    flex:1;
    padding:10px;
  }

</style>
