<template>
  <div class="home-container">
    <van-nav-bar title="标题" fixed />
    <ArticleInfo v-for="item in artlist" 
                :key="item.id"
                :title="item.title"
                :author="item.aut_name"
                :cmt-ount="item.comm_count"
                :time="item.pubdate"
                :cover="item.cover"></ArticleInfo>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api/articleAPI.js'
import ArticleInfo from '@/components/Article/ArticleInfo.vue'
export default {
  name: 'Home',
  components:{
    ArticleInfo
  },
  data() {
    return {
      page: 1,
      limit: 10,
      artlist:[]
    }
  },
  created() {
    this.initArticleList()
  },
  methods: {
    async initArticleList() {
      const {data:res} = await getArticleAPI(this.page,this.limit)
      this.artlist = res
      console.log(res);
    },
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding:46px 0 50px 0;
  /deep/.van-nav-bar {
    background-color: #007bff;
  }
  /deep/.van-nav-bar__title {
    color: #fff;
  }
}
</style>
