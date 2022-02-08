<template>
  <div class="home-container">
    <van-nav-bar title="首页" />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled="finished">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ArticleInfo
          v-for="item in artlist"
          :key="item.id"
          :title="item.title"
          :author="item.aut_name"
          :cmt-count="item.comm_count"
          :time="item.pubdate"
          :cover="item.cover"
        ></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleInfo from '@/components/Article/ArticleInfo.vue'
import { getArticleAPI } from '@/api/articleAPI.js'
export default {
  name: 'Home',
  components: {
    ArticleInfo
  },
  data() {
    return {
      page: 1,
      limit: 10,
      artlist: [],
      loading: true,
      finished: false,
      isLoading: false
    }
  },
  created() {
    this.initArticleAPI()
  },
  methods: {
    async initArticleAPI(isRefresh) {
      const { data: res } = await getArticleAPI(this.page, this.limit)

      if (isRefresh) {
        this.artlist = [...res, ...this.artlist]
        this.isLoading = false
      } else {
        this.artlist = [...this.artlist, ...res]
        this.loading = false
      }

      // console.log(res)
      if (res.length === 0) {
        this.finished = true
      }
    },
    onLoad() {
      this.page++
      this.initArticleAPI()
    },
    onRefresh() {
      this.page++
      this.initArticleAPI(true)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 50px;
  // /deep/.van-nav-bar__content {
  //   background-color: #1989fa;
  // }
  // /deep/.van-nav-bar__title {
  //   color: #fff;
  // }
}
</style>
