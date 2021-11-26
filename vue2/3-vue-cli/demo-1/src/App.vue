<template>
  <div>
    <h1>这是App组件</h1>
    <!-- 步骤3：以标签形式使用注册好的组件 -->
    <div>
      
    </div>
    <Left></Left>
    <Right></Right>
  </div>
</template>

<script>
// 步骤1：导入需要使用的 .vue 组件
import Left from '@/components/Left';
import Right from '@/components/Right';
export default {
  name: 'App',
  components: {
    // 步骤2：注册组件
    Left,
    Right
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>

