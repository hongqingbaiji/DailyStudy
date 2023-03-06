<template>
  <div>
    <h2>{{ msg }}</h2>
    <h3>学生姓名：{{ name }}</h3>
    <h3>学生性别：{{ sex }}</h3>
    <h3>学生年龄：{{ myAge + 1 }}</h3>
    <button @click="updateAge">更新年龄</button>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'Student',
  data() {
    return {
      msg: '学生信息',
      myAge: this.age // 想要修改props传过来的参数，需要先自定义一个变量来中转一下
    }
  },
  // 第一种：简单声明接收
  // props: ['name', 'sex', 'age']

  // 第二种：接收的同时对数据进行类型限制
  // props: {
  //   name: String,
  //   age: Number,
  //   sex: String
  // }

  // 第三种：接收的同时对数据进行：类型限制+默认值的指定+必要性的限制
  props: {
    name: {
      type: String,
      required: true // 必传项
    },
    sex: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      default: 99 // 默认值
    }
  },
  methods: {
    updateAge() {
      this.myAge++ // 最好不要更改props接收到的数据，会被警告
    }
  }
}
</script>
