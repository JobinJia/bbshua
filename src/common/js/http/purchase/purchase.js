import http from '../axiosInstance'
import qs from 'qs'
// 获取采购列表
export const purchase = (params) => {
  // return http.fetchGet(http.baseUrl + 'shop/purchase', params)
  return http.request({
    url: `/order/purchase?${qs.stringify(params)}`,
    method: 'get'
  })
}
export const shopAccount = (params) => {
  // return http.fetchGet(http.baseUrl + 'shop/account', params)
  return http.request({
    url: `/shop/account?${qs.stringify(params)}`,
    method: 'get'
  })
}
export const shopHold = (params) => {
  // return http.fetchPost(http.baseUrl + 'shop/hold', params)
  return http.request({
    url: '/shop/account',
    method: 'post',
    data: params
  })
}
export const shophistory = (params) => {
  // return http.fetchGet(http.baseUrl + 'shop/history', params)
  return http.request({
    url: `/shop/history?${qs.stringify(params)}`,
    method: 'get'
  })
}

// 订单号
export const ordersection = (params) => {
  // return http.fetchGet(http.baseUrl + 'order/section', params)
  return http.request({
    url: `/shop/section?${qs.stringify(params)}`,
    method: 'get'
  })
}
