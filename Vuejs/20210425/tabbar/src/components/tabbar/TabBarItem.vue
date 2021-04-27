<template>
  <div class = "tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'#FF5777'
    }
  },
  methods:{
    itemClick(){
      this.$router.push(this.path)
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {};
    }

  },
}
</script>

<style>
.tab-bar-item {
  flex: 1;
  font-size: 14px;
  text-align: center;
}

.tab-bar-item img{
  width: 24px;
  height:24px;
  margin-top:3px;
  margin-bottom: 1px;
  vertical-align: middle;
}
/* .active{
  color:red;
} */
</style>