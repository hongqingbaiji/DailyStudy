<template>
  <div class="left">
    <h3>Left 组件</h3>
    <hr>
    <p>{{msg}}</p>
    <hr>
    <button @click="broClick">兄弟组件之间的互通</button>
  </div>
</template>

<script>
import bus from './eventBus'
export default {
  name: 'Left',
  props:['msg'],
  data() {
    return {
      str:`梦里相逢人不知，若知是梦何须醒。`
    };
  },
  methods:{
    broClick(){
      bus.$emit('share',this.str);
    }
  }
};
</script>

<style scoped>
.left{
  height: 200px;
  background-color: pink;
  padding:20px;
  flex:1;
}
</style>
