import http from '../axiosInstance'
import qs from 'qs'

export const getShopList = (data) => {
  return http.request({
    url: `/shop/good?${qs.stringify(data)}`,
    method: 'get'
  })
}

// 上下架
export const downShop = (data) => {
  return http.request({
    url: 'shop/down',
    data,
    method: 'post'
  })
}

// 新增
export const addNewShop = (data) => {
  return http.request({
    url: '/shop/good',
    data: data,
    method: 'post'
  })
}

export const updShopItem = (data) => {
  return http.request({
    url: '/shop/good',
    data,
    method: 'put'
  })
}

export const getColor = (data) => {
  return http.request({
    url: '/shop/color',
    method: 'get'
  })
}

export const getCate = (data) => {
  return http.request({
    url: '/shop/cate',
    method: 'get'
  })
}

export const getPetal = (data) => {
  return http.request({
    url: '/shop/petal',
    method: 'get'
  })
}

export const getSpec = (data) => {
  return http.request({
    url: '/shop/spec',
    method: 'get'
  })
}

// 每日价格管理

// modify price
export const updateSpec = (data) => {
  return http.request({
    url: '/shop/update_spec',
    data,
    method: 'post'
  })
}

// 更新价格
export const refreshPrice = (data) => {
  return http.request({
    url: '/shop/refresh',
    data,
    method: 'post'
  })
}

// 隐藏
export const hideShop = (data) => {
  return http.request({
    url: '/shop/show',
    data,
    method: 'post'
  })
}

// 全上线
export const shoAll = () => {
  return http.request({
    url: '/shop/all_show',
    method: 'post'
  })
}
// 全隐藏
export const hideAll = () => {
  return http.request({
    url: '/shop/all_hide',
    method: 'post'
  })
}

// banner
export const getBanner = (data) => {
  return http.request({
    url: `/banner?${qs.stringify(data)}`,
    method: 'get'
  })
}

// modify
export const updBanner = (data) => {
  return http.request({
    url: '/banner',
    data,
    method: 'put'
  })
}

// add baner
export const addBanner = (data) => {
  return http.request({
    url: '/banner',
    data,
    method: 'post'
  })
}
