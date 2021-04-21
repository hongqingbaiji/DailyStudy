// 模板代码
<template>
  <div>
    <button @click="btnClick">按钮</button>
    <h3 class="msg" v-show="isShow">{{ message }}</h3>
  </div>
</template>
// JS代码
<script>
export default {
  data() {
    return {
      message: 'hello',
      isShow: true
    }
  },
  methods: {
    btnClick() {
      return this.isShow = !this.isShow;
    }
  }
}
</script>
// 样式CSS代码
<style scoped>
  .msg{
    font-size:20px;
  }
</style>


