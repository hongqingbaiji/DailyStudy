<template>
  <div>
    <h5>count 组件</h5>
    <p>count 的值为：{{ count }}</p>
    <button @click="count++">+1</button>
  </div>
</template>

<script>
export default {
  name: 'Count',
  components: {},
  props:{
    init:{
      type:Number,
      default:8,
      required:true
    }
  },
  data() {
    return {
      count:this.init
    }
  }
}
</script>

<style>

</style>
