<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'TabBar'
}
</script>

<style>
.tab-bar{
  height: 49px;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  background: #f6f6f6;
  box-shadow: 0,-3px,3px,rgba(0,0,0,.1);
}
</style>