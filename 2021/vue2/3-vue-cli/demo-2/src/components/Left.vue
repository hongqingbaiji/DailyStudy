<template>
  <div class="left">
    <h3>这是Left组件</h3>
    <hr>
    <p>msg 的值：{{msg}}</p>
    <p>user 的值：{{user}}</p>

    <button @click="send">把好诗发给Right</button>
  </div>
</template>

<script>
import bus from './eventBus.js'

export default {
  name: 'Left',
  components: {},
  props:['msg','user'],
  data() {
    return {
      str:`梦里相逢人不见，若知是梦何须醒。纵然梦里常幽会，怎比真如见一回`
    }
  },
  methods:{
    send(){
      bus.$emit('share',this.str)
    }
  }
}
</script>

<style scoped>
  .left{
    height: 200px;
    background-color: pink;
    flex:1;
    padding:20px;
  }
  h3{
    color:red
  }
</style>
