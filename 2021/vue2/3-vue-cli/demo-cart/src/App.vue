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
          @state-change="getNewstate"></Goods>
    <Footer :isfull="fullState" :prices="emt" :counts="total" @full-state-change="getNewFullState"></Footer>
  </div>
</template>

<script>
import axios from 'axios'
import bus from '@/components/eventBus.js'

import Header from '@/components/Header/Header.vue'
import Goods from '@/components/Goods/Goods.vue'
import Footer from '@/components/Footer/Footer.vue'
export default {
  data(){
    return{
      list:[]
    }
  },
  components:{
    Header,
    Goods,
    Footer
  },
  created(){
    this.initCartList();
    bus.$on('share',(val)=>{
      this.list.some(item=>{
        if(item.id === val.id){
          item.goods_count = val.value
          return true
        }
      })
    });
  },
  methods:{
    async initCartList(){
      const { data:res } = await axios.get('https://www.escook.cn/api/cart')
      if(res.status === 200){
        this.list = res.list;
      }
      // console.log(this.list);
    },
    getNewstate(e){
      this.list.some(item=>{
        if(item.id === e.id){
          item.goods_state = e.value;
          return true
        }
      })
    },
    getNewFullState(e){
      this.list.forEach(item=>item.goods_state = e)
    }
  },
  computed:{
    fullState(){
      return this.list.every(item => item.goods_state)
    },
    emt(){
      return this.list.filter(item=>item.goods_state).reduce((total,item)=> total += item.goods_count *item.goods_price,0)
    },
    total(){
      return this.list.filter(item=>item.goods_state).reduce((total,item)=> total += item.goods_count,0)
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
