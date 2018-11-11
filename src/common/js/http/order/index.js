import http from '../axiosInstance'
import qs from 'qs'

// 订单列表
export const getOrderList = (data) => {
  return http.request({
    url: `/order/order?${qs.stringify(data)}`,
    method: 'get'
  })
}

// 订单详情修改运费
export const updatePrice = (data) => {
  return http.request({
    url: '/order/update_fre_price',
    data: data,
    method: 'post'
  })
}

// 订单详情修改完，保存按钮
export const updateAllPrice = (data) => {
  return http.request({
    url: '/order/true_fre_price',
    data: data,
    method: 'post'
  })
}

// 订单分练人修改，调用一个接口
export const updateSendMsg = (data) => {
  return http.request({
    url: '/order/update_fre_price',
    data: data,
    method: 'post'
  })
}

// 更新订单详情中商品信息
export const updateShopInOrderDetail = (data) => {
  return http.request({
    url: '/order/update_good_price',
    data: data,
    method: 'post'
  })
}

// 保存差价 -- todo 暂缓，不确定
export const saveDiffPrice = (data) => {
  return http.request({
    url: '/order/true_good_price',
    data: data,
    method: 'post'
  })
}

// 产生差价 -- 新增
export const createDiffPrice = (data) => {
  return http.request({
    url: '/order/true_good_price',
    data: data,
    method: 'post'
  })
}

// 锁定
export const lockOrder = (data) => {
  return http.request({
    url: '/order/lock',
    data: data,
    method: 'post'
  })
}

// 保存地址
export const saveAddress = (data) => {
  return http.request({
    url: '/order/update_address',
    data: data,
    method: 'post'
  })
}

export const sendOrder = (data) => {
  return http.request({
    url: '/order/send-order',
    data: data,
    method: 'post'
  })
}

// 售后
export const getAfterOrderList = (data) => {
  return http.request({
    url: `/order/after?${qs.stringify(data)}`,
    method: 'get'
  })
}

// 提交
export const afterOrderPost = (data) => {
  return http.request({
    url: '/order/after',
    data,
    method: 'put'
  })
}
