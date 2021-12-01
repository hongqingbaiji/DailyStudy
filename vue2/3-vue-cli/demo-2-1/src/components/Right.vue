<template>
  <div class="right">
    <h3>Right</h3>
    <hr>
    <p>count 的值:{{count}}</p>
    <button @click="add">+1</button>
    <button @click="resetCount">重置</button>
    <p>{{strFromLeft}}</p>
  </div>
</template>

<script>
import bus from './eventBus'
export default {
  name: 'Right',
  data() {
    return {
      count:0,
      strFromLeft:''
    };
  },
  created(){
    bus.$on('share',(val)=>{
      this.strFromLeft = val;
    });
  },
  methods:{
    add(){
      this.count++;
      this.$emit('addClick',this.count);
    },
    resetCount(){
      this.count=0;
      this.$emit('addClick',this.count)
    }
  }
};
</script>

<style scoped>
.right{
  height: 200px;
  background-color: skyblue;
  padding:20px;
  flex: 1;
}
</style>
