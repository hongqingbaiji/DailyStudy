<template>
  <div>
    <h1 v-color="color">这是App组件</h1>
    <p v-abc>App组件的内容</p>
    <button @click="color = 'green'">改变颜色</button>

    <button @click="comName='Left'">展示 Left组件</button> 
    <button @click="comName='Right'">展示 Right组件</button>
    <hr>
    <!-- 步骤3：以标签形式使用注册好的组件 -->
 
    <div class="box">
      <!-- <keep-alive include="Left,Right">
        <component :is="comName"></component>
      </keep-alive> -->
      <Right>
        <template #right>
          <p>这是 app 里的内容</p>
        </template>
      </Right>
    </div>
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
      comName:'Left',
      color:'blue'
    }
  },

  // 私有自定义指令的节点
  directives:{
    // color:{
    //   // 只执行一次
    //   bind(el,binding){
    //     el.style.color = binding.value 
    //   },
    //   // 数据更新的时候执行
    //   update(el,binding){
    //     el.style.color = binding.value
    //   }
    // },

    color(el,binding){
      el.style.color = binding.value
    },

    abc:{
      bind(el){
        el.style.backgroundColor = 'pink'
      }
    }
  }
  

}
</script>

<style scoped>
.box{
  display: flex;
}
</style>

