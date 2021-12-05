<template>
  <div class="number-container d-flex justify-content-center align-items-center">
    <!-- 减 1 的按钮 -->
    <button type="button" class="btn btn-light btn-sm" @click="sub">-</button>
    <!-- 购买的数量 -->
    <span class="number-box">{{ num }}</span>
    <!-- 加 1 的按钮 -->
    <button type="button" class="btn btn-light btn-sm" @click="add">+</button>
  </div>
</template>

<script>
export default {
  props:{
    num:{
      type:Number,
      default:1
    }
  },
  methods:{
    add(){
      this.$emit('num-change',this.num + 1)
    },
    sub(){
      if(this.num - 1 === 0) return
      this.$emit('num-change',this.num - 1)
    }
  }
}
</script>

<style lang="less" scoped>
.number-box {
  min-width: 30px;
  text-align: center;
  margin: 0 5px;
  font-size: 12px;
}

.btn-sm {
  width: 30px;
}
</style>
