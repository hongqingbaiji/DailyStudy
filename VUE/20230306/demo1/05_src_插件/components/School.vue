<template>
  <div>
    <h3>学校名称：{{ name | mySlice }}</h3>
    <h3>学校地址：{{ address }}</h3>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'Student',
  data() {
    return {
      name: '江西农业大学',
      address: '江西南昌'
    }
  }
}
</script>
