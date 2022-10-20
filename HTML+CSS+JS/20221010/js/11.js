class Compute {
  plus(a, b) {
    return a + b
  }
  minus(a, b) {
    return a - b
  }
  mul(a, b) {
    return a * b
  }
  div(a, b) {
    return a / b
  }
}

class Calculator extends Compute {
  constructor(doc) {
    super()
    const oCal = doc.getElementsByClassName('J_calculator')[0]
    this.fInput = oCal.getElementsByClassName('f-input')[0]
    this.sInput = oCal.getElementsByClassName('s-input')[0]
    this.oBtnGroup = oCal.getElementsByClassName('btn-group')[0]
    this.oBtnItems = this.oBtnGroup.getElementsByTagName('button')
    this.oResult = oCal.getElementsByClassName('result')[0]

    this.data = this.dataDefine()
    this.btnIdx = 0
  }
  init() {
    this.bindEvent()
  }

  bindEvent() {
    this.oBtnGroup.addEventListener('click', this.onFieldBtnClick.bind(this), false)
    this.fInput.addEventListener('input', this.onNumberInput.bind(this), false)
    this.sInput.addEventListener('input', this.onNumberInput.bind(this), false)
  }

  dataDefine() {
    let _obj = {},
      fNumber = 0,
      sNumber = 0,
      field = 'plus'

    const _self = this

    Object.defineProperties(_obj, {
      fNumber: {
        get() {
          return fNumber
        },
        set(newVal) {
          fNumber = newVal
          _self.computeResult(fNumber, sNumber, field)
          console.log(fNumber)
        }
      },

      sNumber: {
        get() {
          return sNumber
        },
        set(newVal) {
          sNumber = newVal
          _self.computeResult(fNumber, sNumber, field)
          console.log(sNumber)
        }
      },

      field: {
        get() {
          return field
        },
        set(newVal) {
          field = newVal
          _self.computeResult(fNumber, sNumber, field)
          console.log('field:' + field)
        }
      }
    })

    return _obj
  }

  onFieldBtnClick(ev) {
    let e = ev || window.event,
      tar = e.target || e.srcElement,
      tagName = tar.tagName.toLowerCase()

    tagName === 'button' && this.fieldUpdate(tar)
  }

  fieldUpdate(target) {
    this.oBtnItems[this.btnIdx].className = ''
    this.btnIdx = [].indexOf.call(this.oBtnItems, target)
    target.className += ' current'
    this.data.field = target.getAttribute('data-field')
  }

  onNumberInput(ev) {
    let e = ev || window.event,
      tar = e.target || e.srcElement,
      className = tar.className,
      val = Number(tar.value.replace(/\s+/g, '')) || 0

    if (className === 'f-input') {
      this.data.fNumber = val
    } else if (className === 's-input') {
      this.data.sNumber = val
    }
  }

  computeResult(fNumber, sNumber, field) {
    this.oResult.innerText = this[field](fNumber, sNumber)
  }
}

new Calculator(document).init()
