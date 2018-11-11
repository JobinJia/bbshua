import Vue from 'vue'
import {getMenuBtnAuth} from '@js/util'
import store from './../../store'

Vue.directive('auth', {
  bind (el, binding, vnode) {
    // let leftMenu = JSON.parse(localStorage.getItem('leftMenu')) // 路由 // TODO
    let leftMenu = store.state.app.leftMenuList
    leftMenu = (leftMenu && leftMenu.length !== 0) ? leftMenu : JSON.parse(localStorage.getItem('leftMenu'))
    let href = window.location.href // window.href
    let currentHash = href.split('#')[1]
    let id = el.getAttribute('data-id')
    // console.log('类型为', id)
    // if (id !== 'id') {
    //   throw Error(`directive is ${id}, not 'id'`)
    // }
    let res = getMenuBtnAuth(leftMenu, currentHash, id)
    // console.log(`${id} =========  ${res}`)
    el.style.display = !res ? 'none' : ''
  }
})
