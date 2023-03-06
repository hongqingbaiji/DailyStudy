<template>
  <div>
    <h3>学生名称：{{ studentName }}</h3>
    <h3>学生年龄：{{ age }}</h3>
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
  }
}
</script>

<style scoped></style>
