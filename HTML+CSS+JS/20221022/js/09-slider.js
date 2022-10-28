window.onload = function () {
  init()
}

var init = function () {
  function Slider() {
    this.oSlide = document.getElementsByClassName('slide')[0]
    this.oList = document.getElementsByClassName('list')[0]
    this.oCircle = document.getElementsByClassName('circle')[0]
    this.arrowL = document.getElementsByClassName('arrow-left')[0]
    this.arrowR = document.getElementsByClassName('arrow-right')[0]
    this.oListItems = document.getElementsByClassName('list-item')
    this.thisIdx = 0
    this.num = 0
    this.cired = 0
    this.timer = null
  }

  Slider.prototype = {
    init() {
      this.createCircle()
      this.cloneFirstListItem()
      this.bindEvent()
      this.autoPlay()
    },

    bindEvent() {
      addEvent(this.oSlide, 'mouseover', this.oSlideMouseOver.bind(this))
      addEvent(this.oSlide, 'mouseout', this.oSlideMouseOut.bind(this))
      addEvent(this.oCircle, 'click', this.oCircleClick.bind(this))
      addEvent(this.arrowR, 'click', this.arrowRClick.bind(this))
      addEvent(this.arrowL, 'click', this.arrowLClick.bind(this))
    },

    oSlideMouseOver() {
      this.arrowL.style.display = 'block'
      this.arrowR.style.display = 'block'
      clearInterval(this.timer)
      this.timer = null
    },

    oSlideMouseOut() {
      this.arrowL.style.display = 'none'
      this.arrowR.style.display = 'none'
      this.autoPlay()
    },

    createCircle() {
      var oListItemsLen = this.oListItems.length

      for (var i = 0; i < oListItemsLen; i++) {
        var li = document.createElement('li')
        li.className = 'circle-item'
        this.oCircle.appendChild(li)
      }

      elemChildren(this.oCircle)[0].className += ' current'
    },

    oCircleClick(e) {
      var e = e || window.event,
        tar = e.target || e.srcElement,
        className = tar.className,
        oCircleItems = document.getElementsByClassName('circle-item')

      if (className === 'circle-item') {
        this.thisIdx = [].indexOf.call(oCircleItems, tar)
        this.num = this.thisIdx
        this.cired = this.thisIdx
        this.changeCircle()

        startMove(this.oList, {
          left: -this.thisIdx * 640
        })
      }
    },

    cloneFirstListItem() {
      var li = this.oListItems[0].cloneNode(true)
      this.oList.appendChild(li)
    },

    arrowRClick() {
      var oCircleItems = document.getElementsByClassName('circle-item'),
        oCircleItemsLen = oCircleItems.length

      if (this.num === oCircleItemsLen) {
        this.oList.style.left = 0
        this.num = 0
      }
      this.num++
      startMove(this.oList, {
        left: -this.num * 640
      })
      this.cired++
      if (this.cired === oCircleItemsLen) {
        this.cired = 0
      }
      this.changeCircle()
    },

    arrowLClick() {
      var oCircleItems = document.getElementsByClassName('circle-item'),
        oCircleItemsLen = oCircleItems.length

      if (this.num === 0) {
        this.num = oCircleItemsLen
        this.oList.style.left = -this.num * 640 + 'px'
      }
      this.num--
      startMove(this.oList, {
        left: -this.num * 640
      })
      if (this.cired === 0) {
        this.cired = oCircleItemsLen
      }
      this.cired--
      this.changeCircle()
    },

    changeCircle() {
      var oCircleItems = document.getElementsByClassName('circle-item'),
        oCircleItemsLen = oCircleItems.length
      for (var i = 0; i < oCircleItemsLen; i++) {
        oCircleItems[i].className = 'circle-item'
      }
      oCircleItems[this.cired].className += ' current'
    },

    autoPlay() {
      var _self = this
      this.timer = setInterval(function () {
        _self.arrowR.click()
      }, 2000)
    }
  }
  return new Slider().init()
}
