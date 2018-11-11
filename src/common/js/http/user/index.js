import http from '../axiosInstance'
import qs from 'qs'

export const getUserList = (data) => {
  return http.request({
    url: `user/user?order_number=1&${qs.stringify(data)}`,
    method: 'get'
  })
}
