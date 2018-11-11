import http from '../axiosInstance'
import qs from 'qs'

export const getProList = (data) => {
  return http.request({
    url: `/order/purchase?${qs.stringify(data)}`,
    method: 'get'
  })
}
