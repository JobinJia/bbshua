import Main from '@pages/main'
import parentView from '@pages/parent-view'

/**
 * 可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  sort: 跟据顶部的sort 决定左菜单是哪些 add - jobin
 * }
 */

const appBaseRouters = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/pages/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/shopping/spe',
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/pages/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/pages/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/pages/error-page/404.vue')
  },
  {
    path: '/print/printOne/:id', // 电子面单打印
    name: 'printOne',
    meta: {
      title: '电子面单打印',
      hideInMenu: true
    },
    component: () => import('@/pages/print/printOne.vue')
  },
  {
    path: '/print/printTwo/:id', // 理货单打印
    name: 'printTwo',
    meta: {
      title: '理货单打印',
      hideInMenu: true
    },
    component: () => import('@/pages/print/printTwo.vue')
  },
  {
    path: '/print/printThree/:id', // 装箱单打印
    name: 'printThree',
    meta: {
      title: '装箱单打印',
      hideInMenu: true
    },
    component: () => import('@/pages/print/printThree.vue')
  },
  {
    path: '/print/printFour/:id', // 订单详情打印
    name: 'printFour',
    meta: {
      title: '订单详情打印',
      hideInMenu: true
    },
    component: () => import('@/pages/print/printFour.vue')
  },
  {
    path: '/print/printpurchase/:start_sn/:end_sn', // 订单详情打印
    name: 'printpurchase',
    meta: {
      title: '采购统计表',
      hideInMenu: true
    },
    component: () => import('@/pages/print/printpurchase.vue')
  }
]
// const appLeftRouter = [
//   {
//     path: '/shopping',
//     name: 'shopping',
//     sort: 1,
//     meta: {icon: '', title: '营销板块'},
//     children: [{
//       path: '/shopping/spe',
//       name: 'spe',
//       meta: {icon: '', title: '今日特价'},
//       children: [],
//       component: () => import('@pages/shopping/spe-pro.vue')
//     }, {
//       path: '/shopping/new',
//       name: 'new',
//       meta: {icon: '', title: '新品速递'},
//       children: [],
//       component: () => import('@pages/shopping/new-pro.vue')
//     }, {
//       path: '/shopping/new/newDetail/:id',
//       name: 'newProDetail',
//       meta: {
//         icon: '',
//         title: '商品信息',
//         hideInMenu: true
//       },
//       component: () => import('@pages/shopping/newProDetail.vue')
//     }, {
//       path: '/shopping/flower',
//       name: 'flower',
//       meta: {icon: '', title: '花店直选'},
//       children: [],
//       component: () => import('@pages/shopping/flower.vue')
//     }, {
//       path: '/shopping/flower/flowerDetail/:id',
//       name: 'flowerDetail',
//       meta: {
//         icon: '',
//         title: '商品信息',
//         hideInMenu: true
//       },
//       component: () => import('@pages/shopping/flowerDetail.vue')
//     }, {
//       path: '/shopping/team',
//       name: 'team',
//       meta: {icon: '', title: '团购包邮'},
//       children: [],
//       component: () => import('@pages/shopping/team.vue')
//     }, {
//       path: '/shopping/team/teamDetail/:id',
//       name: 'teamDetail',
//       meta: {
//         icon: '',
//         title: '商品信息',
//         hideInMenu: true
//       },
//       component: () => import('@pages/shopping/teamDetail.vue')
//     }],
//     component: Main
//   }, {
//     path: '/flower',
//     name: 'flowers',
//     sort: 1,
//     meta: {icon: '', title: '热销花材'},
//     children: [{
//       path: '/flower/hot-flower',
//       name: 'hotFlower',
//       meta: {icon: '', title: '热销花材'},
//       children: [],
//       component: () => import('@pages/shopping/hot-flower.vue')
//     }],
//     component: Main
//   }, {
//     path: '/price',
//     name: 'price',
//     sort: 1,
//     meta: {icon: '', title: '每日价格更新'},
//     children: [{
//       path: '/shopping/update-price',
//       name: 'updatePrice',
//       sort: 1,
//       meta: {icon: '', title: '每日价格更新'},
//       children: [],
//       component: () => import('@pages/shopping/update-price.vue')
//     }],
//     component: Main
//   }, {
//     path: '/level',
//     name: 'level',
//     sort: 1,
//     meta: {icon: '', title: '等级管理'},
//     children: [{
//       path: '/level/level-index',
//       name: 'levelIndex',
//       meta: {icon: '', title: '等级管理'},
//       children: [],
//       component: () => import('@pages/shopping/level.vue')
//     }],
//     component: Main
//   }, {
//     path: '/color',
//     name: 'color',
//     sort: 1,
//     meta: {icon: '', title: '颜色管理'},
//     children: [{
//       path: '/color/color-index',
//       name: 'colorIndex',
//       meta: {icon: '', title: '颜色管理'},
//       children: [],
//       component: () => import('@pages/shopping/color.vue')
//     }],
//     component: Main
//   }, {
//     path: '/petal',
//     name: 'petal',
//     sort: 1,
//     meta: {icon: '', title: '特征性描述'},
//     children: [{
//       path: '/petal/petal-index',
//       name: 'petalIndex',
//       meta: {icon: '', title: '特征性描述'},
//       children: [],
//       component: () => import('@pages/shopping/petal.vue')
//     }],
//     component: Main
//   }, {
//     path: '/hos-flower-category',
//     name: 'flowerCategory',
//     sort: 1,
//     meta: {icon: '', title: '热销花材分类'},
//     children: [{
//       path: '/hos-flower-category/hfc-index',
//       name: 'hfclIndex',
//       meta: {icon: '', title: '热销花材分类'},
//       children: [],
//       component: () => import('@pages/shopping/flower-category.vue')
//     }, {
//       path: '/hos-flower-category/viewCate/:id',
//       name: 'viewCate',
//       meta: {
//         icon: '',
//         title: '色系',
//         hideInMenu: true
//       },
//       component: () => import('@pages/shopping/view-cate.vue')
//     }],
//     component: Main
//   }, {
//     path: '/hos-flower-banner',
//     name: 'flowerBanner',
//     sort: 1,
//     meta: {icon: '', title: 'Banner管理'}, // 热销花材Banner
//     children: [{
//       path: '/hos-flower-banner/hfb-index',
//       name: 'hfblIndex',
//       meta: {icon: '', title: 'Banner管理'},
//       children: [],
//       component: () => import('@pages/shopping/flower-banner.vue')
//     }, {
//       path: '/hos-flower-banner/hfb-index/editor',
//       name: 'editorBanner',
//       meta: {
//         icon: '',
//         title: '编辑信息',
//         hideInMenu: true
//       },
//       component: () => import('@pages/shopping/editor-banner.vue')
//     }],
//     component: Main
//   },
//   // {
//   //   path: '/index-banner',
//   //   name: 'indexBanner',
//   //   sort: 1,
//   //   meta: {icon: '', title: '首页Banner'},
//   //   children: [{
//   //     path: '/index-banner/i-index',
//   //     name: 'iIndex',
//   //     meta: {icon: '', title: '首页Banner'},
//   //     children: [],
//   //     component: () => import('@pages/shopping/index-banner.vue')
//   //   }],
//   //   component: Main
//   // },
//   {
//     path: '/mxapp',
//     name: 'wxapp',
//     sort: 1,
//     meta: {icon: '', title: '小程序公告'},
//     children: [{
//       path: '/wxapp/index',
//       name: 'wxappIndex',
//       meta: {icon: '', title: '小程序公告'},
//       children: [],
//       component: () => import('@pages/shopping/wx-app.vue')
//     }],
//     component: Main
//   }, {
//     path: '/hot-search',
//     name: 'hotSearch',
//     sort: 1,
//     meta: {icon: '', title: '热搜关键词'},
//     children: [{
//       path: '/hot-search/index',
//       name: 'hotSearchIndex',
//       meta: {icon: '', title: '热搜关键词'},
//       children: [],
//       component: () => import('@pages/shopping/hot-search.vue')
//     }],
//     component: Main
//   }, {
//     path: '/tags',
//     name: 'tags',
//     sort: 1,
//     meta: {icon: '', title: '标签'},
//     children: [{
//       path: '/tags/index',
//       name: 'tagsIndex',
//       meta: {icon: '', title: '标签'},
//       children: [],
//       component: () => import('@pages/shopping/tags.vue')
//     }],
//     component: Main
//   }, {
//     path: '/marketing',
//     name: 'marketing',
//     sort: 1,
//     meta: {icon: '', title: '营销语'},
//     children: [{
//       path: '/marketing/index',
//       name: 'marketingIndex',
//       meta: {icon: '', title: '营销语'},
//       children: [],
//       component: () => import('@pages/shopping/marketing.vue')
//     }],
//     component: Main
//   }, {
//     path: '/order',
//     name: 'order',
//     sort: 2,
//     component: Main,
//     children: [
//       {
//         path: '/order/orderList',
//         name: 'orderList',
//         meta: {
//           icon: '',
//           title: '订单列表'
//         },
//         component: () => import('@pages/order/order.vue')
//       },
//       {
//         path: '/order/orderList/orderDetail/:id',
//         name: 'orderDetail',
//         meta: {
//           icon: '',
//           title: '订单详情',
//           hideInMenu: true
//         },
//         component: () => import('@pages/order/orderDetail.vue')
//       },
//       {
//         path: '/order/orderList/afterOrder',
//         name: 'afterOrder',
//         meta: {
//           icon: '',
//           title: '售后',
//           hideInMenu: true
//         },
//         component: () => import('@pages/order/afterOrder.vue')
//       }, {
//         path: '/order/orderList/afterOrderDetail/:id/:type',
//         name: 'afterOrderDetail',
//         meta: {
//           icon: '',
//           title: '售后详情',
//           hideInMenu: true
//         },
//         component: () => import('@pages/order/afterOrderDetail.vue')
//       }
//     ]
//   }, {
//     path: '/user',
//     name: 'user',
//     sort: 3,
//     component: Main,
//     children: [
//       {
//         path: '/user/userList',
//         name: 'userList',
//         meta: {
//           icon: '',
//           title: '用户列表'
//         },
//         component: () => import('@pages/user/user.vue')
//       }
//       // {
//       //   path: '/order/orderList/orderDetail/:id',
//       //   name: 'orderDetail',
//       //   meta: {
//       //     icon: '',
//       //     title: '订单详情',
//       //     hideInMenu: true
//       //   },
//       //   component: () => import('@pages/order/orderDetail.vue')
//       // }
//     ]
//   }, {
//     path: '/procurement',
//     name: 'procurement',
//     sort: 4,
//     component: Main,
//     children: [
//       {
//         path: '/procurement/procurementList',
//         name: 'procurementList',
//         meta: {
//           icon: '',
//           title: '采购列表'
//         },
//         component: () => import('@pages/procurement/procurementList.vue')
//       }
//     ]
//   }, {
//     path: '/settle',
//     name: 'settle',
//     sort: 5,
//     component: Main,
//     children: [
//       {
//         path: '/settle/settleList',
//         name: 'settleList',
//         meta: {
//           icon: '',
//           title: '结算列表'
//         },
//         component: () => import('@pages/settle/settleList.vue')
//       }
//     ]
//   }, {
//     path: '/settle_his',
//     name: 'settleHis',
//     sort: 5,
//     component: Main,
//     children: [
//       {
//         path: '/settle/history',
//         name: 'history',
//         meta: {
//           icon: '',
//           title: '历史列表'
//         },
//         component: () => import('@pages/settle/history.vue')
//       }
//     ]
//   }, {
//     path: '/finance',
//     name: 'finance',
//     sort: 6,
//     component: Main,
//     children: [
//       {
//         path: '/finance/financeList',
//         name: 'financeList',
//         meta: {
//           icon: '',
//           title: '结算列表'
//         },
//         component: () => import('@pages/finance/financeList.vue')
//       }
//     ]
//   }, {
//     path: '/finance_yes',
//     name: 'financeYes',
//     sort: 6,
//     component: Main,
//     children: [
//       {
//         path: '/finance/yesterday',
//         name: 'yesterday',
//         meta: {
//           icon: '',
//           title: '昨日结算货款'
//         },
//         component: () => import('@pages/finance/yesterday.vue')
//       }
//     ]
//   }, {
//     path: '/auth',
//     name: 'auth',
//     sort: 7,
//     component: Main,
//     children: [
//       {
//         path: '/auth/userList',
//         name: 'authUserList',
//         meta: {
//           icon: '',
//           title: '员工列表'
//         },
//         component: () => import('@pages/auth/userList.vue')
//       }
//     ]
//   }, {
//     path: '/auth_group',
//     name: 'authGroup',
//     sort: 7,
//     component: Main,
//     children: [
//       {
//         path: '/auth/group',
//         name: 'groupList',
//         meta: {
//           icon: '',
//           title: '分组'
//         },
//         component: () => import('@pages/auth/groupList.vue')
//       }
//     ]
//   }
//   ]

const appLeftRouter = [
  {
    path: '/shopping',
    name: 'shopping',
    component: parentView,
    sort: 1,
    meta: {
      hideInMenu: true,
      notCache: true,
      title: '商品'
    },
    children: [
      {
        path: '/sales',
        name: 'sales',
        sort: 1,
        meta: {icon: '', title: '营销板块'},
        component: Main,
        children: [{
          path: '/spe',
          name: 'spe',
          meta: {icon: '', title: '今日特价'},
          children: [],
          component: () => import('@pages/shopping/spe-pro.vue')
        }, {
          path: '/shopping/new',
          name: 'new',
          meta: {icon: '', title: '新品速递'},
          children: [],
          component: () => import('@pages/shopping/new-pro.vue')
        }, {
          path: '/shopping/new/newDetail/:id',
          name: 'newProDetail',
          meta: {
            icon: '',
            title: '商品信息',
            hideInMenu: true
          },
          component: () => import('@pages/shopping/newProDetail.vue')
        }, {
          path: '/shopping/flower',
          name: 'flower',
          meta: {icon: '', title: '花店直选'},
          children: [],
          component: () => import('@pages/shopping/flower.vue')
        }, {
          path: '/shopping/flower/flowerDetail/:id',
          name: 'flowerDetail',
          meta: {
            icon: '',
            title: '商品信息',
            hideInMenu: true
          },
          component: () => import('@pages/shopping/flowerDetail.vue')
        }, {
          path: '/shopping/team',
          name: 'team',
          meta: {icon: '', title: '团购包邮'},
          children: [],
          component: () => import('@pages/shopping/team.vue')
        }, {
          path: '/shopping/team/teamDetail/:id',
          name: 'teamDetail',
          meta: {
            icon: '',
            title: '商品信息',
            hideInMenu: true
          },
          component: () => import('@pages/shopping/teamDetail.vue')
        }]
      }, {
        path: '/flower',
        name: 'flowers',
        sort: 1,
        meta: {icon: '', title: '热销花材'},
        children: [{
          path: '/flower/hot-flower',
          name: 'hotFlower',
          meta: {icon: '', title: '热销花材'},
          children: [],
          component: () => import('@pages/shopping/hot-flower.vue')
        }],
        component: Main
      }, {
        path: '/price',
        name: 'price',
        sort: 1,
        meta: {icon: '', title: '每日价格更新'},
        children: [{
          path: '/shopping/update-price',
          name: 'updatePrice',
          sort: 1,
          meta: {icon: '', title: '每日价格更新'},
          children: [],
          component: () => import('@pages/shopping/update-price.vue')
        }],
        component: Main
      }, {
        path: '/level',
        name: 'level',
        sort: 1,
        meta: {icon: '', title: '等级管理'},
        children: [{
          path: '/level/level-index',
          name: 'levelIndex',
          meta: {icon: '', title: '等级管理'},
          children: [],
          component: () => import('@pages/shopping/level.vue')
        }],
        component: Main
      }, {
        path: '/color',
        name: 'color',
        sort: 1,
        meta: {icon: '', title: '颜色管理'},
        children: [{
          path: '/color/color-index',
          name: 'colorIndex',
          meta: {icon: '', title: '颜色管理'},
          children: [],
          component: () => import('@pages/shopping/color.vue')
        }],
        component: Main
      }, {
        path: '/petal',
        name: 'petal',
        sort: 1,
        meta: {icon: '', title: '特征性描述'},
        children: [{
          path: '/petal/petal-index',
          name: 'petalIndex',
          meta: {icon: '', title: '特征性描述'},
          children: [],
          component: () => import('@pages/shopping/petal.vue')
        }],
        component: Main
      }, {
        path: '/hos-flower-category',
        name: 'flowerCategory',
        sort: 1,
        meta: {icon: '', title: '热销花材分类'},
        children: [{
          path: '/hos-flower-category/hfc-index',
          name: 'hfclIndex',
          meta: {icon: '', title: '热销花材分类'},
          children: [],
          component: () => import('@pages/shopping/flower-category.vue')
        }, {
          path: '/hos-flower-category/viewCate/:id',
          name: 'viewCate',
          meta: {
            icon: '',
            title: '色系',
            hideInMenu: true
          },
          component: () => import('@pages/shopping/view-cate.vue')
        }],
        component: Main
      }, {
        path: '/hos-flower-banner',
        name: 'flowerBanner',
        sort: 1,
        meta: {icon: '', title: 'Banner管理'}, // 热销花材Banner
        children: [{
          path: '/hos-flower-banner/hfb-index',
          name: 'hfblIndex',
          meta: {icon: '', title: 'Banner管理'},
          children: [],
          component: () => import('@pages/shopping/flower-banner.vue')
        }, {
          path: '/hos-flower-banner/hfb-index/editor',
          name: 'editorBanner',
          meta: {
            icon: '',
            title: '编辑信息',
            hideInMenu: true
          },
          component: () => import('@pages/shopping/editor-banner.vue')
        }],
        component: Main
      },
      // {
      //   path: '/index-banner',
      //   name: 'indexBanner',
      //   sort: 1,
      //   meta: {icon: '', title: '首页Banner'},
      //   children: [{
      //     path: '/index-banner/i-index',
      //     name: 'iIndex',
      //     meta: {icon: '', title: '首页Banner'},
      //     children: [],
      //     component: () => import('@pages/shopping/index-banner.vue')
      //   }],
      //   component: Main
      // },
      {
        path: '/mxapp',
        name: 'wxapp',
        sort: 1,
        meta: {icon: '', title: '小程序公告'},
        children: [{
          path: '/wxapp/index',
          name: 'wxappIndex',
          meta: {icon: '', title: '小程序公告'},
          children: [],
          component: () => import('@pages/shopping/wx-app.vue')
        }],
        component: Main
      }, {
        path: '/hot-search',
        name: 'hotSearch',
        sort: 1,
        meta: {icon: '', title: '热搜关键词'},
        children: [{
          path: '/hot-search/index',
          name: 'hotSearchIndex',
          meta: {icon: '', title: '热搜关键词'},
          children: [],
          component: () => import('@pages/shopping/hot-search.vue')
        }],
        component: Main
      }, {
        path: '/tags',
        name: 'tags',
        sort: 1,
        meta: {icon: '', title: '标签'},
        children: [{
          path: '/tags/index',
          name: 'tagsIndex',
          meta: {icon: '', title: '标签'},
          children: [],
          component: () => import('@pages/shopping/tags.vue')
        }],
        component: Main
      }, {
        path: '/marketing',
        name: 'marketing',
        sort: 1,
        meta: {icon: '', title: '营销语'},
        children: [{
          path: '/marketing/index',
          name: 'marketingIndex',
          meta: {icon: '', title: '营销语'},
          children: [],
          component: () => import('@pages/shopping/marketing.vue')
        }],
        component: Main
      }
    ]
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
    component: parentView,
    children: [
      {
        path: '/order-page',
        name: 'orderPage',
        sort: 2,
        component: Main,
        children: [
          {
            path: '/order/orderList',
            name: 'orderList',
            meta: {
              icon: '',
              title: '订单列表'
            },
            component: () => import('@pages/order/order.vue')
          },
          {
            path: '/order/orderList/orderDetail/:id',
            name: 'orderDetail',
            meta: {
              icon: '',
              title: '订单详情',
              hideInMenu: true
            },
            component: () => import('@pages/order/orderDetail.vue')
          },
          {
            path: '/order/orderList/afterOrder',
            name: 'afterOrder',
            meta: {
              icon: '',
              title: '售后',
              hideInMenu: true
            },
            component: () => import('@pages/order/afterOrder.vue')
          }, {
            path: '/order/orderList/afterOrderDetail/:id/:type',
            name: 'afterOrderDetail',
            meta: {
              icon: '',
              title: '售后详情',
              hideInMenu: true
            },
            component: () => import('@pages/order/afterOrderDetail.vue')
          }
        ]
      }
    ]
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
    component: parentView,
    children: [
      {
        path: '/user-list',
        name: 'userPage',
        sort: 3,
        component: Main,
        children: [
          {
            path: '/user/userList',
            name: 'userList',
            meta: {
              icon: '',
              title: '用户列表'
            },
            component: () => import('@pages/user/user.vue')
          }
          // {
          //   path: '/order/orderList/orderDetail/:id',
          //   name: 'orderDetail',
          //   meta: {
          //     icon: '',
          //     title: '订单详情',
          //     hideInMenu: true
          //   },
          //   component: () => import('@pages/order/orderDetail.vue')
          // }
        ]
      }
    ]
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
    component: parentView,
    children: [
      {
        path: '/procurement-page',
        name: 'procurementPage',
        sort: 4,
        component: Main,
        children: [
          {
            path: '/procurement/procurementList',
            name: 'procurementList',
            meta: {
              icon: '',
              title: '采购列表'
            },
            component: () => import('@pages/procurement/procurementList.vue')
          }
        ]
      }
    ]
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
    component: parentView,
    children: [
      {
        path: '/settle-page',
        name: 'settlePage',
        sort: 5,
        component: Main,
        children: [
          {
            path: '/settle/settleList',
            name: 'settleList',
            meta: {
              icon: '',
              title: '结算列表'
            },
            component: () => import('@pages/settle/settleList.vue')
          }
        ]
      }, {
        path: '/settle_his',
        name: 'settleHis',
        sort: 5,
        component: Main,
        children: [
          {
            path: '/settle/history',
            name: 'history',
            meta: {
              icon: '',
              title: '历史列表'
            },
            component: () => import('@pages/settle/history.vue')
          }
        ]
      }
    ]
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
    component: parentView,
    children: [
      {
        path: '/finance-page',
        name: 'financePage',
        sort: 6,
        component: Main,
        children: [
          {
            path: '/finance/financeList',
            name: 'financeList',
            meta: {
              icon: '',
              title: '结算列表'
            },
            component: () => import('@pages/finance/financeList.vue')
          }
        ]
      }, {
        path: '/finance_yes',
        name: 'financeYes',
        sort: 6,
        component: Main,
        children: [
          {
            path: '/finance/yesterday',
            name: 'yesterday',
            meta: {
              icon: '',
              title: '昨日结算货款'
            },
            component: () => import('@pages/finance/yesterday.vue')
          }
        ]
      }
    ]
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
    component: parentView,
    children: [
      {
        path: '/auth_group',
        name: 'authGroup',
        sort: 7,
        component: Main,
        children: [
          {
            path: '/auth/group',
            name: 'groupList',
            meta: {
              icon: '',
              title: '分组'
            },
            component: () => import('@pages/auth/groupList.vue')
          }
        ]
      }
    ]
  }
]
export default Array.from(new Set([...appBaseRouters, ...appLeftRouter]))
