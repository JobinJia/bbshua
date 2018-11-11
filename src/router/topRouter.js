import Main from '@pages/main'

/**
 * 目前没有业务需求，这里的router只是一个数据
 * 并没有实际的做用。可达到三级菜单的效果，但实际没有
 * TODO 创建一个真实三级菜单。思路如下
 * step1 新建一个组件转发一级顶拦的路由，类似现在的二到三级菜单的切换
 *       这样可以把router合并，不用再写两个
 * 后续不用变，保证现状态
 * @type {*[]}
 */
const appTopRouters = [
  {
    path: '/',
    name: 'shopping',
    redirect: '/shopping',
    component: Main,
    sort: 1,
    meta: {
      hideInMenu: true,
      notCache: true,
      title: '商品'
    }
  },
  {
    path: '/order',
    name: 'order',
    sort: 2,
    meta: {
      hideInMenu: true,
      notCache: true,
      title: '订单',
      level: 1
    },
    component: Main,
    children: []
  },
  {
    path: '/user',
    name: 'user',
    sort: 3,
    meta: {
      hideInMenu: true,
      notCache: true,
      title: '用户',
      level: 1
    },
    component: Main,
    children: []
  },
  {
    path: '/procurement',
    name: 'procurement',
    sort: 4,
    meta: {
      hideInMenu: true,
      notCache: true,
      title: '采购',
      level: 1
    },
    component: Main,
    children: []
  },
  {
    path: '/settle',
    name: 'settle',
    sort: 5,
    meta: {
      hideInMenu: true,
      notCache: true,
      title: '结算',
      level: 1
    },
    component: Main,
    children: []
  },
  {
    path: '/finance',
    name: 'finance',
    sort: 6,
    meta: {
      hideInMenu: true,
      notCache: true,
      title: '财务',
      level: 1
    },
    component: Main,
    children: []
  },
  {
    path: '/auth',
    name: 'auth',
    sort: 7,
    meta: {
      hideInMenu: true,
      notCache: true,
      title: '权限',
      level: 1
    },
    component: Main,
    children: []
  }
]

export default appTopRouters
