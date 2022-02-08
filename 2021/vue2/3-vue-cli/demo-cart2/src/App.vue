<template>
  <div class="app-container">
    <Header></Header>
    <Goods v-for="item in list" 
          :key="item.id"
          :id="item.id"
          :title="item.goods_name"
          :pic="item.goods_img"
          :price="item.goods_price"
          :state="item.goods_state"
          :count="item.goods_count"
          @count-change="getNewCount"
          >
          <Counter :num="item.goods_count" @num-change="getNewNum(item,$event)"></Counter>
    </Goods>
    <Footer :isfull="fullState" :prices="cmt" :num="totals" @full-change="getNewFull"></Footer>
  </div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header/Header.vue'
import Goods from '@/components/Goods/Goods.vue'
import Footer from '@/components/Footer/Footer.vue'
import Counter from '@/components/Counter/Counter.vue'
export default {
  data(){
    return{
      list:[]
    }
  },
  components:{
    Header,
    Goods,
    Footer,
    Counter
  },
  created(){
    this.initCartList()
  },
  methods:{
    async initCartList(){
      const {data:res} = await axios.get('https://www.escook.cn/api/cart')
      if(res.status === 200){
        this.list = res.list
      }
    },
    getNewCount(val){
      this.list.some(item=>{
        if(item.id === val.id){
          item.goods_state = val.value
          return true
        }
      })
    },
    getNewFull(val){
      this.list.some(item => {
        item.goods_state = val
      })
    },
    getNewNum(item,e){
      console.log(item,e);
      item.goods_count = e
    }
  },
  computed:{
    fullState(){
      return this.list.every(item => item.goods_state)
    },
    cmt(){
      return this.list.filter(item=>item.goods_state).reduce((total,val) => total += val.goods_price*val.goods_count,0)
    },
    totals(){
      return this.list.filter(item=>item.goods_state).reduce((total,val)=> total += val.goods_count,0)
    }
  }
}
</script>

<style lang="less" scoped>
.app-container {
  padding-top: 45px;
  padding-bottom: 50px;
}
</style>
