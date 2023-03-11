<template>
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      v-model="title"
      @keyup.enter="add"
    />
  </div>
</template>

<script>
import { nanoid } from 'nanoid'

export default {
  name: 'MyHeader',
  // props: ['addTodo'],
  data() {
    return {
      title: ''
    }
  },
  methods: {
    add() {
      if (!this.title.trim()) return alert('请输入内容!')
      const todoObj = { id: nanoid(), title: this.title, done: false }
      this.title = ''
      // this.addTodo(todoObj) // 使用的是父组件先准备一个函数的方法
      // this.$emit('addTodo2', todoObj) //使用自定义组件的方法
      this.$emit('addTodo3', todoObj)
    }
  }
}
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
