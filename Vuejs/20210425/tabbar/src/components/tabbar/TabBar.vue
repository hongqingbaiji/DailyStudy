<template>
  <div id="tab-bar">
    <slot></slot>
  </div>

</template>

<script>
export default {
  name:'TabBar',

}
</script>

<style>
#tab-bar {
  display: flex;
  position: fixed;
  left:0;
  right:0;
  bottom: 0;
  background-color: #f6f6f6;
  box-shadow: 0 -3px 10px rgba(0, 0, 0, .1);

  height: 49px;
  

}
</style>
