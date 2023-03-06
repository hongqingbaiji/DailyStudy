<template>
  <div>
    <h3>学校名称：{{ schoolName }}</h3>
    <h3>学校地址：{{ address }}</h3>
    <hr />
    <student></student>
  </div>
</template>

<script>
import Student from '../components/Student.vue'
export default {
  name: 'School',
  components: {
    Student
  },
  data() {
    return {
      schoolName: '江西农业大学',
      address: '江西南昌'
    }
  }
}
</script>

<style scoped></style>
