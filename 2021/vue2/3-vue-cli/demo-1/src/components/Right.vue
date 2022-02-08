<template>
  <div class="right">
    <h3>这是Right组件</h3>
    <hr>
    <my-count :init="6"></my-count>
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
    width: 200px;
    height: 200px;
    background-color: purple;
  }
</style>
