<template>
  <div>
    <h1 v-text="msg" ref="title"></h1>
    <button ref="btn" @click="showDOM">点击获取DOM元素</button>
    <School ref="sch" id="sch2"></School>
  </div>
</template>

<script>
import School from './components/School.vue'
export default {
  name: 'App',
  components: {
    School
  },
  data() {
    return {
      msg: '欢迎学习Vue!'
    }
  },
  methods: {
    showDOM() {
      console.log(this.$refs.title)
      console.log(this.$refs.btn)
      console.log(this.$refs.sch)
      console.log(document.getElementById('sch2'))
    }
  }
}
</script>

<style scoped></style>
