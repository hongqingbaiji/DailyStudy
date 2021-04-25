<template>
  <div>
    <h3>我是关于 About</h3>
    <p>我是About里的内容</p>
  </div>
</template>

<script>
export default {
  name:'About',
    created(){
    console.log('About created');
  },
  destroyed(){
    console.log('About destroued');
  }
}
</script>

<style>

</style>