import { login, logout, getSystemStatus } from '@js/http/app'
import { setToken, getToken, delToken } from '@/common/js/util'
import Cookies from 'js-cookie'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: ''
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit, state }, {userName, password}) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          const data = res.data
          let {userInfo, menuList, token} = data
          commit('setToken', token)
          Cookies.set('userInfo', userInfo)
          getSystemStatus().then(result => {
            let {data} = result
            commit('setBackendVersion', data.version)
            this.dispatch('updateSystemStatusList', data)
          })
          resolve(menuList)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          delToken()
          localStorage.clear()
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      // return new Promise((resolve, reject) => {
      //   getUserInfo(state.token).then(res => {
      //     const data = res.data
      //     commit('setAvator', data.avator)
      //     commit('setUserName', data.user_name)
      //     commit('setUserId', data.user_id)
      //     commit('setAccess', data.access)
      //     resolve(data)
      //   }).catch(err => {
      //     reject(err)
      //   })
      // })
    }
  }
}
