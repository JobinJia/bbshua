import http from '../axiosInstance'
// 登陆
export const login = (data) => {
  return http.request({
    url: '/login',
    data,
    method: 'post'
  })
}

// 获得左菜单
export const getLeftMenu = ({parentCode}) => {
  return http.request(({}))
}

// 登出
export const logout = (token) => {
  return http.request({
    url: '/auth/logOut',
    method: 'post'
  })
}

// 系统状态包
export const getSystemStatus = () => {
  return http.request({
    url: '/status',
    method: 'get'
  })
}
