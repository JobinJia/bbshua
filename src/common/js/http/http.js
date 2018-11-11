import Axios from 'axios'
// import qs from 'qs'
import {Message} from 'iview'
// import Cookies from 'js-cookie'
import {delToken} from '@js/util'
import router from '@/router'

const baseURL = 'https://bbshua.com/api/admin/v2'

// const baseURL = 'https://bbshua.com/api/admin'

class httpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }

  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }

  // 请求拦截
  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      // if (!config.url.includes('/login')) {
      //   config.headers['Authorization'] = 'token 123' // Cookies.get(TOKEN_KEY)
      // }
      // 请求带上后端Cookie凭证
      // config.withCredentials = true
      return config
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      let {data} = res
      if (res.status === 200) {
        // 后端服务在个别情况下回报201，待确认
        if (data.code === 1) { // error
          Message.error({
            content: data.message
          })
        } else if (data.code === 2) { // not login
          delToken()
          router.replace({
            path: '/login'
          })
        } else if (data.code === 0) {
          return data
        } else {
          Message.destroy()
          Message.error(res.data.msg)
          return data.data
        }
        return false
      }
    }, (error) => {
      // let {response: {data: {msg}}} = error
      // Message.destroy(
      Message.destroy()
      Message.error(`服务内部错误, ${error}`)
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }

  // 创建实例
  create () {
    let conf = {
      baseURL: baseURL,
      // timeout: 2000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
        // 'Content-Type': 'application/x-www-form-urlencoded'
        // 'X-URL-PATH': location.pathname
      }
    }
    return Axios.create(conf)
  }

  // 合并请求实例
  mergeReqest (instances = []) {
    //
  }

  // 请求实例
  request (options) {
    let instance = this.create()
    // var instance = this.createCustom(options.url)
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}

export default httpRequest
