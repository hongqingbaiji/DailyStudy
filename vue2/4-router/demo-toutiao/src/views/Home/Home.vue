<template>
  <div class="home-container">
    <van-nav-bar title="标题" placeholder fixed />
    <h3>aaa</h3>
    <h3>bbb</h3>
    <h3>zzz</h3>
  </div>
</template>

<script>
import request from '@/utils/request.js'
export default {
  name: 'Home',
  data() {
    return {
      page: 1,
      limit: 10
    }
  },
  created() {
    this.initArticleList()
  },
  methods: {
    async initArticleList() {
      const { data: res } = await request.get('/articles', {
        params: {
          _page: this.page,
          _limit: this.limit
        }
      })
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  /deep/.van-nav-bar {
    background-color: #007bff;
  }
  /deep/.van-nav-bar__title {
    color: #fff;
  }
}
</style>
