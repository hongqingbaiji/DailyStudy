<template>
  <div class = "tab-bar-item">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :class="{active:isActive}"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  data(){
    return{
      isActive:true
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
.active{
  color:red;
}
</style>