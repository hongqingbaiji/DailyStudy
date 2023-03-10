<template>
  <div>
    <h3>学生姓名：{{ name }}</h3>
    <h3>学生性别：{{ sex }}</h3>
    <input type="text" v-fbind:value="name" />
    <hr />
  </div>
</template>

<script>
export default {
  name: 'Student',
  data() {
    return {
      msg: '学生信息',
      name: '张三',
      sex: '男'
    }
  }
}
</script>
