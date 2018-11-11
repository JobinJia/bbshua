// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable import/first */
import Vue from 'vue'
import App from './App'
import Promise from 'promise-polyfill'
// To add to window
if (!window.Promise) {
  window.Promise = Promise
}
import 'babel-polyfill'
import '@/common/css/base.less'
import 'iview/dist/styles/iview.css'
import iView from 'iview'
import '@/common/css/theme/theme.less'
import config from '@/common/js/config'
import router from '@/router/index'
import api from '@/common/js/http'
import store from './store'
import util from '@js/appUtils'
import '@/common/plugins/ButtonAuth'
import Conf from '@/config'

Vue.use(iView, {
  transfer: true,
  size: 'large'
})

// Vue.use(vAuth)
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
Vue.prototype.$http = api
Vue.prototype.$util = util
Vue.prototype.$Config = Conf

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  mounted () {
    this.$Message.config({
      top: 50,
      duration: 3
    })
    this.$Notice.config({
      top: 50,
      duration: 3
    })
  }
})
