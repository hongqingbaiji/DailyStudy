var mod = (function (module) {
  module.b = 2
  module.c = module.a

  module.test2 = function () {
    console.log('test2')
  }

  return module
})(mod || {})
