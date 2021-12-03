<template>
  <div>
    <h1>这是App组件</h1>
    <!-- 步骤3：以标签形式使用注册好的组件 -->
    <Test></Test>
    <Left></Left>
    <Right></Right>
  </div>
</template>

<script>
// 步骤1：导入需要使用的 .vue 组件
import Left from '@/components/Left';
import Right from '@/components/Right';
import Test from '@/components/Test.vue';
export default {
  name: 'App',
  components: {
    // 步骤2：注册组件
    Left,
    Right,
    Test
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>

