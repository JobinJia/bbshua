import http from '../axiosInstance'
import qs from 'qs'

// level列表
export const getLevelList = (data) => {
  return http.request({
    url: `/shop/spec?${qs.stringify(data)}`,
    method: 'get'
  })
}

export const commitLevel = (data) => {
  return http.request({
    url: '/shop/spec',
    data,
    method: 'put'
  })
}

export const deleteLevel = (data) => {
  return http.request({
    url: '/shop/spec',
    data,
    method: 'delete'
  })
}

export const addLevel = (data) => {
  return http.request({
    url: '/shop/spec',
    data,
    method: 'post'

  })
}

/* ========================color======================= */
// get
export const getColorList = (data) => {
  return http.request({
    url: `/shop/color?${qs.stringify(data)}`,
    method: 'get'
  })
}

// upd
export const updColor = (data) => {
  return http.request({
    url: '/shop/color',
    data,
    method: 'put'
  })
}

// del
export const delColor = (data) => {
  return http.request({
    url: '/shop/color',
    data,
    method: 'delete'
  })
}

export const addColor = (data) => {
  return http.request({
    url: '/shop/color',
    data,
    method: 'post'

  })
}

/* ========================特征======================= */
// get
export const getPetalList = (data) => {
  return http.request({
    url: `/shop/petal?${qs.stringify(data)}`,
    method: 'get'
  })
}

// upd
export const updPetal = (data) => {
  return http.request({
    url: '/shop/petal',
    data,
    method: 'put'
  })
}

// del
export const delPetal = (data) => {
  return http.request({
    url: '/shop/petal',
    data,
    method: 'delete'
  })
}

export const addPetal = (data) => {
  return http.request({
    url: '/shop/petal',
    data,
    method: 'post'

  })
}
/* ========================色系和分类======================= */
// 分类
// get
export const getCategory = (data) => {
  return http.request({
    url: `/shop/cate?${qs.stringify(data)}`,
    method: 'get'
  })
}

// upd
export const updCategory = (data) => {
  return http.request({
    url: '/shop/cate',
    data,
    method: 'put'
  })
}

// del
export const delCategory = (data) => {
  return http.request({
    url: '/shop/cate',
    data,
    method: 'delete'
  })
}

export const addCategory = (data) => {
  return http.request({
    url: '/shop/cate',
    data,
    method: 'post'

  })
}
// 色系
// get
export const getColorSys = (data) => {
  return http.request({
    url: `/shop/color_system?${qs.stringify(data)}`,
    method: 'get'
  })
}

// upd
export const updColorSys = (data) => {
  return http.request({
    url: '/shop/color_system',
    data,
    method: 'put'
  })
}

// del
export const delColorSys = (data) => {
  return http.request({
    url: '/shop/color_system',
    data,
    method: 'delete'
  })
}

export const addColorSys = (data) => {
  return http.request({
    url: '/shop/color_system',
    data,
    method: 'post'

  })
}
