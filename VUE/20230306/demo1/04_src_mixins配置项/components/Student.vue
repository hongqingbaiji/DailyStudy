<template>
  <div>
    <h3 @click="showName">学生姓名：{{ name }}</h3>
    <h3>学生性别：{{ sex }}</h3>
    <hr />
  </div>
</template>

<script>
import { mixin } from '../mixin'
export default {
  name: 'Student',
  data() {
    return {
      msg: '学生信息',
      name: '张三',
      sex: '男'
    }
  },
  mixins: [mixin]
  // methods: {
  //   showName() {
  //     alert(this.name)
  //   }
  // }
}
</script>
