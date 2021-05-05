import Vue from 'vue';
import Vuex from 'vuex';

// 1.安装插件
Vue.use(Vuex);

// 2.创建对象
const store = new Vuex.Store({
  state: {
    counter: 1000,
    students: [{
      id: 110,
      name: 'Kobe',
      age: 25
    }, {
      id: 111,
      name: 'wenhe',
      age: 18
    }, {
      id: 112,
      name: 'shaonian',
      age: 22
    }, {
      id: 113,
      name: 'ajiu',
      age: 17
    }],
    info: {
      id: 110,
      name: 'able',
      age: 25
    },

  },
  mutations: {
    increment(state) {
      state.counter++
    },
    decrement(state) {
      state.counter--
    },
    addCounter(state, num) {
      state.counter += num
    },
    addStu(state, stu) {
      state.students.push(stu);
    },
    updateInfo(state) {
      setTimeout(() => {
        state.info.name = 'doinb'
      }, 1000)
    }

  },
  getters: {
    powerCounter(state) {
      return state.counter * state.counter;
    },
    getAgeMore20(state) {
      return state.students.filter(s => s.age < 20);
    },
    //可以有第二个参数，必须是getters
    getAgeMore20Length(state, getters) {
      return getters.getAgeMore20.length;
    },
    // 用户随便传入age，需要用到函数来接收age，
    // 不能在getAge()里直接传age
    getAge(state) {
      return function(age) {
        return state.students.filter(s => s.age > age);
      }
    },


  },
  actions: {
    // context 上下文
    aUpdateInfo(context) {
      setTimeout(() => {

      }, 1000);
    }
  },
  modules: {
    a: {

    }
  }
})

// 3.导出
export default store;