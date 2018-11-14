import {
  getBreadCrumbList,
  getMenuByRouter
  // mergeLeftMenu,
} from '@/common/js/util' //   mergeTopMenu
import routers from '@/router/routers'
import topRouter from '@/router/topRouter'

export default {
  state: {
    breadCrumbList: [],
    topMenuList: [],
    leftMenuList: [],
    systemStatusObject: null,
    copyRight: 'Copyright © 2017 集采, All Rights Reserved.'
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(state.leftMenuList, rootState.user.access),
    systemMap: (state) => {
      return state.systemStatusObject !== null ? state.systemStatusObject : JSON.parse(localStorage.getItem('systemStatus'))
    }
  },
  mutations: {
    setBackendVersion (state, v) {
      localStorage.setItem('backendVersion', v)
      state.backendVersion = v
    },
    setTopMenuList (state, menuList) {
      state.topMenuList = (menuList && menuList.length !== 0) ? [...menuList] : JSON.parse(localStorage.getItem('topMenu'))
    },
    setLeftMenuList (state, leftList) {
      state.leftMenuList = (leftList) ? [...leftList] : JSON.parse(localStorage.getItem('leftMenu'))
    },
    setBreadCrumb (state, routeMetched) {
      let homeRoute = null
      let hasLeft = state.leftMenuList && state.leftMenuList.length !== 0
      if (hasLeft) {
        homeRoute = state.topMenuList.find(item => !!item.checked)
        homeRoute = Object.assign({}, homeRoute, {redirect: '', to: ''}) // 合并
      } else {
        // homeRoute = state.homeRoute
        homeRoute = Object.assign({}, state.homeRoute, {redirect: '/home', to: '/home'})
      }
      // let homeRoute = state.homeRoute
      let breadCrumbList = getBreadCrumbList(routeMetched, homeRoute)
      state.breadCrumbList = breadCrumbList
    },
    setSystemStatusObj (state, obj) {
      if (obj && JSON.stringify(obj) !== '{}') {
        state.systemStatusObject = obj
      } else {
        state.systemStatusObject = JSON.parse(localStorage.getItem('systemStatus'))
      }
    }
  },
  actions: {
    initMenus ({dispatch, commit}) {
      let finalRouter = topRouter
      finalRouter.forEach((item, index) => {
        if (index === 0) {
          item.checked = true
        } else {
          item.checked = false
        }
      })
      localStorage.setItem('topMenu', JSON.stringify(finalRouter))
      commit('setTopMenuList', finalRouter)
      dispatch('updateLeftMenuList', finalRouter)
    },
    updateSystemStatusList ({commit}, obj) {
      localStorage.setItem('systemStatus', JSON.stringify(obj))
      commit('setSystemStatusObj', obj)
    },
    toggleClickHandlerTopMenuList ({commit}, menuList) {
      // menuList = mergeTopMenu(topRouter, menuList)
      localStorage.setItem('topMenu', JSON.stringify(menuList))
      commit('setTopMenuList', menuList)
    },
    updateTopMenuList ({commit}, menuList) {
      // let finalRouter = mergeTopMenu(topRouter, menuList)
      let finalRouter = topRouter
      localStorage.setItem('topMenu', JSON.stringify(finalRouter))
      commit('setTopMenuList', finalRouter)
    },
    updateLeftMenuList ({state, commit}, topList) {
      // menuList = (menuList && menuList.length !== 0) ? menuList : []
      let currentRouter = topList.find(item => item.checked === true)
      let sort = currentRouter.sort
      let leftRouter = routers.filter(item => item.sort === sort)
      // save to localStorage
      localStorage.setItem('leftMenu', JSON.stringify(leftRouter))
      commit('setLeftMenuList', leftRouter)
    },
    updateBreadCrumb ({commit}, list) {
      commit('setBreadCrumb', list)
    }
  }
}
