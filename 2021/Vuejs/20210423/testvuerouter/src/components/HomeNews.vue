<template>
  <div>
    <ul>
      <li>新闻1</li>
      <li>新闻2</li>
      <li>新闻3</li>
      <li>新闻4</li>
      <li>新闻5</li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'HomeNews',
    created(){
    console.log('HomeNews created');
  },
  destroyed(){
    console.log('HomeNews destroued');
  }
}
</script>

<style>

</style>