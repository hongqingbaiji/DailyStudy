<template>
  <div>
    <h3>学生名称：{{ studentName }}</h3>
    <h3>学生年龄：{{ age }}</h3>
    <button @click="sendStudentName">获取学生姓名</button>
    <button @click="unbind">解绑atguigu事件</button>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data() {
    return {
      studentName: '文和',
      age: 18
    }
  },
  methods: {
    sendStudentName() {
      this.$emit('atguigu', this.studentName)
      this.$emit('demo', this.studentName)
    },
    unbind() {
      // this.$off('atguigu') // 解绑一个自定义事件
      // this.$off(['atguigu', 'demo']) // 解绑多个自定义事件
      this.$off() // 解绑所有自定义事件
    }
  }
}
</script>

<style scoped></style>
