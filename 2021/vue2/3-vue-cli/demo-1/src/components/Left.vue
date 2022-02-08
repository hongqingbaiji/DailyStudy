<template>
  <div class="left">
    <h3>这是Left组件</h3>
    <hr>
    <my-count :init="9"></my-count>
  </div>
</template>

<script>
export default {
  name: 'Left',
  components: {},
  data() {
    return {

    }
  }
}
</script>

<style scoped>
  .left{
    width: 200px;
    height: 200px;
    background-color: pink;
  }
  h3{
    color:red
  }

  h5{
    color:green
  }
</style>
