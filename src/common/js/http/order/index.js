import http from '../axiosInstance'
import qs from 'qs'

// 订单列表
export const getOrderList = (data) => {
  return http.request({
    url: `/order/order?${qs.stringify(data)}`,
    method: 'get'
  })
}

export const moveOrder = (data) => {
  return http.request({
    url: '/order/move',
    method: 'post',
    data
  })
}

export const updSendType = (data) => {
  return http.request({
    url: '/order/change_send_type',
    data,
    method: 'put'
  })
}

export const updOrderDesc = (data) => {
  return http.request({
    url: '/order/update_des',
    data,
    method: 'put'
  })
}

export const finishDiff = (data) => {
  return http.request({
    url: '/order/finish_diff',
    method: 'post',
    data
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

export const getOtherTips = (data) => {
  return http.request({
    url: `/order/order_tip?${qs.stringify(data)}`,
    method: 'get'
  })
}

export const addTip = (data) => {
  return http.request({
    url: '/order/order_tip',
    method: 'post',
    data
  })
}
export const removeItemTip = (data) => {
  return http.request({
    url: '/order/order_tip',
    method: 'delete',
    data
  })
}

export const copyAllPrice = (data) => {
  return http.request({
    url: '/order/copy_price',
    data,
    method: 'post'
  })
}

export const uplodOrderImg = (data) => {
  return http.request({
    url: '/order/tally',
    data,
    method: 'post'
  })
}

export const refundOrder = (data) => {
  return http.request({
    url: '/order/refund',
    method: 'post',
    data
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
