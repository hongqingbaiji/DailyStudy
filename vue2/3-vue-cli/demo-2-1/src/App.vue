<template>
  <div class="appSty">
    <h1>App 组件</h1>
    <hr>
    <div class="appBox">
      <Left></Left>
      <Right></Right>
    </div>
  </div>
</template>

<script>
import Left from './components/Left.vue';
import Right from './components/Right.vue';
export default {
  name: 'App',
  components:{
    Left,
    Right
  },
  data() {
    return {

    };
  },

};
</script>

<style scoped>
.appBox{
  display: flex;
}
</style>
