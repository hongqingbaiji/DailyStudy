<template>
  <div class="appSty">
    <h1>App 组件</h1>
    <p>msg: {{message}}</p>
    <p>count的值：{{countFromRight}}</p>
    <button @click="resetApp">重置</button>
    <hr>
    <input type="text" v-if="inputVisible" @blur="showBtn" ref="iptRef">
    <button @click="showIpt" v-else>展示输入框</button>
    <hr>
    <div class="appBox">
      <Left :msg="message" ></Left>
      <Right @addClick="getCountChange" ref="reset" ></Right>
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
      message:'Hello wenhe!',
      countFromRight:0,
      inputVisible:false,
    };
  },
  methods:{
    getCountChange(val){
      this.countFromRight = val;
    },
    resetApp(){
      console.log(this);
      this.$refs.reset.resetCount();
    },
    showIpt(){
      this.inputVisible = true;
      this.$nextTick(()=>{
        this.$refs.iptRef.focus();
      })
    },
    showBtn(){
      this.inputVisible = false;
    }
  }
};
</script>

<style scoped>
.appBox{
  display: flex;
}
</style>
