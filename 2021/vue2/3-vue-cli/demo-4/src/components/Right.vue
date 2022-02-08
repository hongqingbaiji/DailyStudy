<template>
  <div class="right-container">
    <h3>Right 组件</h3>
    <hr>
    <button @click="right">POST</button>
   </div>
</template>

<script>
export default {
  name: 'Right',
  data() {
    return {
    }
  },
  methods: {
    async right() {
      const { data: res } = await this.$http.post('/api/post', { name: 'zs', age: 19 })
      console.log(res)
    }
  }
}
</script>

<style scoped>
.right-container{
  flex:1;
  height: 200px;
  background-color:sandybrown;
  padding:10px;
}
</style>
