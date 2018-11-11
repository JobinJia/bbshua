import {forEach, hasOneOf} from './tools'
// cookie保存的天数
import config from '@/config'
import Cookies from 'js-cookie'

import Main from '@pages/main'

export const TOKEN_KEY = 'token'

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, {expires: config.cookieExpires || 1})
}

export const delToken = () => {
  Cookies.remove(TOKEN_KEY)
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) {
    return token
  } else {
    return false
  }
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  let res = []
  forEach(list, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(item.children, access)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (showThisMenuEle(item, access)) res.push(obj)
    }
  })
  return res
}

// export const getMenuByRouter = (list, topId) => {
//   let res = []
//   forEach(list, item => {
//     if (!topId && item.path === '/') {
//       res.push(item)
//     } else if (hasChild(item)) {
//     }
//   })
//   return res
// }

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (routeMetched, homeRoute) => {
  let res = routeMetched.filter(item => {
    return item.meta === undefined || !item.meta.hide
  }).map(item => {
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: item.meta
    }
    return obj
  })
  res = res.filter(item => {
    return !item.meta.hideInMenu
  })
  // return [Object.assign(homeRoute || {}, {to: homeRoute ? homeRoute.path : ''}), ...res]
  return [Object.assign(homeRoute, {to: homeRoute.path}), ...res]
}

export const showTitle = (item, vm) => vm.$config.useI18n ? vm.$t(item.name) : ((item.meta && item.meta.title) || item.name)

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  localStorage.tagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNaveList
  return list ? JSON.parse(list) : []
}

export const clearTagNavListFromLocalStorage = () => {
  let list = getTagNavListFromLocalstorage()
  let res = []
  if (list) {
    res = list.filter(item => item.name === 'home')
  }
  setTagNavListInLocalstorage(res)
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = routers => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children)
      if (res.name) return res
    } else {
      if (item.name === 'home') homeRoute = item
    }
  }
  return homeRoute
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const {name, path, meta} = newRoute
  let newList = [...list]
  if (newList.findIndex(item => item.name === name) >= 0) {
    return newList
  } else {
    newList.push({name, path, meta})
  }
  return newList
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) {
    return hasOneOf(access, route.meta.access)
  } else {
    return true
  }
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = (list) => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }

  return routePermissionJudge(routes)
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextName = (list, name) => {
  let res = ''
  if (list.length === 2) {
    res = 'home'
  } else {
    if (list.findIndex(item => item.name === name) === list.length - 1) {
      res = list[list.length - 2].name
    } else {
      res = list[list.findIndex(item => item.name === name) + 1].name
    }
  }
  return res
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback()
  }
}

/**
 * @param {Object} file 从上传组件得到的文件对象
 * @returns {Promise} resolve参数是解析后的二维数组
 * @description 从Csv文件中解析出表格，解析成二维数组
 */
export const getArrayFromFile = (file) => {
  let nameSplit = file.name.split('.')
  let format = nameSplit[nameSplit.length - 1]
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsText(file) // 以文本格式读取
    let arr = []
    reader.onload = function (evt) {
      let data = evt.target.result // 读到的数据
      let pasteData = data.trim()
      arr = pasteData.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {
        return row.split('\t')
      }).map(item => {
        return item[0].split(',')
      })
      if (format === 'csv') {
        resolve(arr)
      } else {
        reject(new Error('[Format Error]:你上传的不是Csv文件'))
      }
    }
  })
}

/**
 * @param {Array} array 表格数据二维数组
 * @returns {Object} { columns, tableData }
 * @description 从二维数组中获取表头和表格数据，将第一行作为表头，用于在iView的表格中展示数据
 */
export const getTableDataFromArray = (array) => {
  let columns = []
  let tableData = []
  if (array.length > 1) {
    let titles = array.shift()
    columns = titles.map(item => {
      return {
        title: item,
        key: item
      }
    })
    tableData = array.map(item => {
      let res = {}
      item.forEach((col, i) => {
        res[titles[i]] = col
      })
      return res
    })
  }
  return {
    columns,
    tableData
  }
}

export const findNodeUpper = (ele, tag) => {
  if (ele.parentNode) {
    if (ele.parentNode.tagName === tag.toUpperCase()) {
      return ele.parentNode
    } else {
      return findNodeUpper(ele.parentNode, tag)
    }
  }
}

export const findNodeDownward = (ele, tag) => {
  const tagName = tag.toUpperCase()
  if (ele.childNodes.length) {
    let i = -1
    let len = ele.childNodes.length
    while (++i < len) {
      let child = ele.childNodes[i]
      if (child.tagName === tagName) {
        return child
      } else {
        return findNodeDownward(child, tag)
      }
    }
  }
}

export const showByAccess = (access, canViewAccess) => {
  return hasOneOf(canViewAccess, access)
}

/**
 * 顶部菜单与本地的合并，求交集，并添加/home
 * @param arr1  本地topRouter
 * @param arr2  系统返回router
 * @returns {Array}
 */
export const mergeTopMenu = (arr1, arr2) => {
  let res = []
  for (let i in arr1) {
    let item1 = arr1[i]
    if (item1.path === '/') {
      item1.checked = true
      res.push(item1)
    }
    for (let j in arr2) {
      let item2 = arr2[j]
      if (item1.path === item2.path) {
        let r = Object.assign({}, item1, {
          checked: false,
          menuCode: item2.menuCode,
          meta: {
            title: item2.name,
            icon: item2.icon || '',
            hideInMenu: item1.meta.hideInMenu,
            notCache: item1.meta.notCache
          }
        })
        res.push(r)
      }
    }
  }
  return res
}

/*
export const mergeLeftMenu = (routers, list) => {
  let res = []
  for (let i in routers) {
    let item1 = routers[i]
    for (let j in list) {
      let item2 = list[j]
      // if (item1.path === item2.path) {
      if (item1.path.indexOf(item2.path) !== -1) {
        let r = Object.assign({}, item1, {
          menuCode: item2.menuCode,
          meta: {
            title: item2.name,
            menuCode: item2.menuCode
          },
          children: mergeLeftMenu(item1.children, item2.children)
        })
        res.push(r)
      }
    }
  }
  return res
}
*/

/**
 * 递归合并
 * @param list
 * @returns {Array}
 */
export const mergeLeftMenu = (list) => {
  let res = []
  for (let i in list) {
    let item = list[i]
    let path = item.path
    let pathArr = path ? path.split('/') : []
    // 跟据后端返回的路径 拼出实时的页面路径 目前固定二级为/xxx/xxx 三级为/xx/xx/xx
    // 所以有了以下玩法
    // let len = pathArr.length
    let name = ''
    if (pathArr && pathArr.length !== 0) {
      for (let i = 0; i < pathArr.length; i++) {
        let item = pathArr[i]
        if (item !== '') {
          if (i === 1) {
            name += item
          } else {
            name += item.charAt(0).toUpperCase() + item.substr(1, item.length - 1)
          }
        }
      }
    }
    let r = {
      path: path,
      name: name,
      menuCode: item.menuCode,
      authType: item.authType,
      exclude: item.exclude || [],
      meta: {
        title: item.name,
        menuCode: item.menuCode,
        icon: item.icon || ''
      },
      component: (pathArr && pathArr.length === 3) ? Main : () => {
        return require(`@pages${path}.vue`)
      }
    }
    if (item.children && item.children.length !== 0) {
      r.children = mergeLeftMenu(item.children)
    }
    res.push(r)
  }
  return res
}

/**
 * 检查某个按钮是否有权限，用于展示
 * @param leftMenuList 当前左栏菜单
 * @param pagePath 当前页面路径
 * @param btnId 要检查的按钮的ID A-a A-b 等
 * @returns {boolean}
 */
export const getMenuBtnAuth = (leftMenuList, pagePath, btnId) => {
  let item = getMenuBtnAutItem(leftMenuList, pagePath)
  let authType = item.authType || []
  let exclude = item.exclude || []
  let btnArr = btnId.split('-') // [A] [a]
  if (authType.indexOf(btnArr[0]) !== -1) { // 包含在大类里面有权限
    if (exclude.indexOf(btnId) === -1) { // 没有权限的按钮的合集
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

/**
 * 递归查项符合条件的一项
 * @param leftMenuList
 * @param pagePath
 * @returns {*}
 */
export const getMenuBtnAutItem = (leftMenuList, pagePath) => {
  let current = null
  if (leftMenuList.length === 0) {
    return {}
  }
  for (let i = 0; i < leftMenuList.length; i++) {
    let item = leftMenuList[i]
    let path = item.path
    if (pagePath.indexOf(path) !== -1) { // 包含在当前页面路径下的菜单 （不是父级菜单就是当前菜单）
      if (pagePath === path) { // 找到了
        current = item
        return current
      } else { // 包含但是不相等，找子级
        if (item.children && item.children.length !== 0) {
          current = getMenuBtnAutItem(item.children, pagePath)
        }
      }
    }
  }
  return current
}
