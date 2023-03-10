export default {
  install(Vue) {
    // 定义全局过滤器
    Vue.filter('mySlice', function (value) {
      return value.slice(0, 4)
    })

    // 定义全局指令
    Vue.directive('fbind', {
      bind(element, binding) {
        element.value = binding.value
      },
      inserted(element) {
        element.focus()
      },
      update(element, binding) {
        element.value = binding.value
      }
    })

    // 定义混入
    Vue.mixin({
      data() {
        return {
          x: 100,
          y: 200
        }
      }
    })
  }
}
