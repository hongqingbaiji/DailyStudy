<template>
  <div>
    <Student name="张三" sex="男" :age="18"></Student>
    <Student name="李四" sex="女"></Student>
  </div>
</template>

<script>
import Student from './components/Student.vue'
export default {
  name: 'App',
  components: {
    Student
  },
  data() {
    return {}
  }
}
</script>
