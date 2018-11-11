import Cookies from 'js-cookie'
import {
  delToken
} from './util'

class Timer {
  constructor (vm) {
    this.vm = vm
    this.userLeaveHandler = this.userLeaveHandler.bind(this)
    this.doc = null
    this.body = document.querySelector('html')
    this.testUser = null
  }

  static getInstance (vm) { // 单例
    if (!this.instance) {
      this.instance = new Timer(vm)
    }
    return this.instance
  }

  static start (vm) {
    Timer.getInstance(vm).start()
  }

  userLeaveHandler (time, cb) {
    let self = this
    time = time || 5
    let userTime = time * 60
    let objTime = {
      init: 0,
      time: function () {
        objTime.init += 1
        if (objTime.init === userTime) {
          // 用户到达未操作事件 做一些处理
          cb()
        }
      },
      eventFun: function () {
        clearInterval(self.testUser)
        objTime.init = 0
        self.testUser = setInterval(objTime.time, 1000)
      }
    }

    this.testUser = setInterval(objTime.time, 1000)

    this.body.addEventListener('click', objTime.eventFun)
    this.body.addEventListener('keydown', objTime.eventFun)
    this.body.addEventListener('mousemove', objTime.eventFun)
    this.body.addEventListener('mousewheel', objTime.eventFun)
  }

  start () {
    // let count = 0
    clearInterval(this.testUser)
    let _vm = this.vm
    // let routeName = _vm.$route.name
    this.userLeaveHandler(10, () => {
      let routeName = _vm.$route.name
      // console.log(`code out ${routeName}`, count)
      // count++
      if (!_vm._$.isNull(routeName) && routeName !== 'login') {
        delToken()
        localStorage.clear()
        Cookies.remove('userInfo')
        clearInterval(this.testUser)
        this.testUser = null
        window.location.href = '/#/login'
      } else {
        this.stop()
      }
    })
  }

  static stop (vm) {
    Timer.getInstance(vm).stop()
  }

  stop () {
    clearInterval(this.testUser)
  }
}

export default Timer
