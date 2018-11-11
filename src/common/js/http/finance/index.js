import http from '../axiosInstance'
import qs from 'qs'

// 订单列表
export const getFinanceList = (data) => {
  return http.request({
    url: `/order/finance?${qs.stringify(data)}`,
    method: 'get'
  })
}

export const financepost = (params) => {
  return http.request({
    url: '/order/finance',
    data: params,
    method: 'post'
  })
}
