import request from '@/utils/request'

export function Logout() {
  return request.get( '/user/Logout')
}
export function getMess() {
  return request.get('/user/getMess')
}

export function login(data) {
  return request.post('/user/adminLogin',data)
}
