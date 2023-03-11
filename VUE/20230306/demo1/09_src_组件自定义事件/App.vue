<template>
  <div>
    <h1>欢迎您!</h1>

    <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
    <School :getSchoolName="getSchoolName"></School>

    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（使用v-on或@） -->
    <Student @atguigu="getStudentName" @demo="m1"></Student>

    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（ref实现） -->
    <Student ref="student" />
  </div>
</template>

<script>
import School from './components/School.vue'
import Student from './components/Student.vue'
export default {
  name: 'App',
  components: {
    School,
    Student
  },
  data() {
    return {
      msg: '欢迎学习Vue!'
    }
  },
  methods: {
    getSchoolName(name) {
      console.log('APP收到了学校名称：', name)
    },
    getStudentName(name) {
      console.log('APP收到了学生姓名：', name)
    },
    m1() {
      console.log('APP收到了m1信息')
    }
  },
  mounted() {
    // 使用ref实现 子传父
    this.$refs.student.$on('atguigu', this.getStudentName)
  }
}
</script>

<style scoped></style>
