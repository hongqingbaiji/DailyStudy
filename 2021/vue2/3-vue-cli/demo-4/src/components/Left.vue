<template>
  <div class="left-container">
    <h3>Left 组件</h3>
    <hr>
    <button @click="left">GET</button>
   </div>
</template>

<script>
export default {
  name: 'Left',
  data() {
    return {
    }
  },
  methods: {
    async left() {
      const { data: res } = await this.$http.get('/api/get')
      console.log(res)
    }
  }
}
</script>

<style scoped>
.left-container{
  flex:1;
  height: 200px;
  background-color: skyblue;
  padding:10px;
}
</style>
