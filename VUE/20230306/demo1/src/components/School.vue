<template>
  <div>
    <h3 @click="showName">学校名称：{{ name }}</h3>
    <h3>学校地址：{{ address }}</h3>
    <hr />
  </div>
</template>

<script>
import { mixin } from '../mixin'
export default {
  name: 'Student',
  data() {
    return {
      name: '江西农业大学',
      address: '江西南昌'
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
