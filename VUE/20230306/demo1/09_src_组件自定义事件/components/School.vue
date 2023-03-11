<template>
  <div>
    <h3>学校名称：{{ schoolName }}</h3>
    <h3>学校地址：{{ address }}</h3>
    <button @click="sendSchoolName">获取学校名称</button>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'School',
  props: ['getSchoolName'],
  data() {
    return {
      schoolName: '江西农业大学',
      address: '江西南昌'
    }
  },
  methods: {
    sendSchoolName() {
      this.getSchoolName(this.schoolName)
    }
  }
}
</script>

<style scoped></style>
