<template>
  <div>
    <h3>App 组件</h3>
    <div class="box">
      <Left></Left>
      <Right></Right>
    </div>
  </div>
</template>

<script>
import Left from '@/components/Left.vue'
import Right from '@/components/Right.vue'

export default {
  name: 'App',
  components: {
    Left,
    Right
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.box{
  display:flex;
}
</style>
