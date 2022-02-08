<template>
  <div class="right">
    <h3>这是Right组件</h3>
    <hr>
    <p>count 的值：{{count}}</p>
    <button @click="add">+1</button>
    <hr>
    <p> {{strFromLeft}} </p>
  </div>
</template>

<script>
import bus from './eventBus.js'
export default {
  name: 'Right',
  components: {},
  data() {
    return {
      count:0,
      strFromLeft:''
    }
  },
  created(){
    bus.$on('share',(val)=>{
      this.strFromLeft = val;
    })
  },
  methods:{
    add(){
      this.count++;
      this.$emit('numchange',this.count)
    }
  }
}
</script>

<style scoped>
  .right{
    height: 200px;
    background-color: gold;
    flex:1;
    padding:20px;
  }

</style>
