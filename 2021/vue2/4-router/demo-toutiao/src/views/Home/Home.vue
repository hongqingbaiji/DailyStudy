<template>
  <div class="home-container">
    <van-nav-bar title="标题" fixed />
    <van-pull-refresh v-model="isLoading" :disabled="finished" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ArticleInfo
          v-for="item in artlist"
          :key="item.id"
          :title="item.title"
          :author="item.aut_name"
          :cmt-ount="item.comm_count"
          :time="item.pubdate"
          :cover="item.cover"
        ></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api/articleAPI.js'
import ArticleInfo from '@/components/Article/ArticleInfo.vue'
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
      // 是否正在加载下一页数据，如果loading为true，则不会反复触发load事件
      // 每当下一页数据请求回来后，切记把loading改回false，以免不再触发load事件
      // loading的默认值要为true，防止一进来页面就会触发一次load事件
      // 应该在生命周期函数里第一次获取数据后 手动把loading改回false
      loading: true,
      // 所有数据都加载完毕后，要把finished改为true
      finished: false,
      isLoading: false
    }
  },
  created() {
    this.initArticleList()
  },
  methods: {
    async initArticleList(isRefresh) {
      const { data: res } = await getArticleAPI(this.page, this.limit)

      if (isRefresh) {
        this.artlist = [...res, ...this.artlist]
        this.isLoading = false
      } else {
        // 拼接数组，把新加载的数据拼接到原数据的后面
        this.artlist = [...this.artlist, ...res]
        this.loading = false
      }
      if (res.length === 0) {
        this.finished = true
      }
    },
    // 上拉加载
    onLoad() {
      // 1、让页码值+1
      this.page++
      // 2、重新请求接口获取数据
      this.initArticleList()
    },
    // 下拉刷新
    onRefresh() {
      // 1、让页码值+1
      this.page++
      // 2、重新请求接口获取数据
      this.initArticleList(true)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 46px 0 50px 0;
  // 使用了全局主题，所以这些样式不用了
  // /deep/.van-nav-bar {
  //   background-color: #007bff;
  // }
  // /deep/.van-nav-bar__title {
  //   color: #fff;
  // }
}
</style>
