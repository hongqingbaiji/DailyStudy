<template>
  <div class="test">
    <h3>Test 组件---{{books.length}}本书</h3>
  </div>
</template>

<script>
export default {
  name: 'Test',
  components: {},
  data() {
    return {
      books:[]
    }
  },
  methods:{
    initBookList(){
      const xhr = new XMLHttpRequest()
      xhr.addEventListener('load',()=>{
        const result = JSON.parse(xhr.responseText)
        console.log(result);
        this.books = result.data
      })
      xhr.open('GET','http://www.liulongbin.top:3006/api/getbooks')
      xhr.send()
    }
  },
  created(){
    this.initBookList()
  }
}
</script>

<style scoped>
.test{
  background-color: #ccc;
  height: 200px;
}
</style>
