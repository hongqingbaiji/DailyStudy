<template>
  <div class="right">
    <h3>这是Right组件</h3>
    <hr>
    <slot name="right">
      <h6>这是 Right 里的内容</h6>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Right',
  components: {},
  data() {
    return {

    }
  }
}
</script>

<style scoped>
  .right{
    height: 200px;
    background-color: skyblue;
    flex:1;
    padding:10px;
  }
</style>
