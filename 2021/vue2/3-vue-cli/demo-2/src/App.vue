<template>
  <div>
    <h3>APP组件</h3>
    <hr>
    <p>countFromSon的值是：{{countFromSon}}</p>
    <p>{{message}}-----{{userinfo}}</p>
    <div class="box">
      <Left :msg="message" :user="userinfo"></Left>
      <Right @numchange="getNewCount"></Right>
    </div>

  </div>
</template>

<script>
import Left from '@/components/Left.vue'
import Right from '@/components/Right.vue'

export default {
  name: 'App',
  components: { 
    Left,
    Right
  },
  data() {
    return {
      message:'hello wenhe',
      userinfo:{name:'wenhe',age:18},
      countFromSon:0
    }
  },
  methods:{
    getNewCount(val){
      this.countFromSon = val;
    }
  }
}
</script>

<style scoped>
.box{
  display: flex;
}
</style>

