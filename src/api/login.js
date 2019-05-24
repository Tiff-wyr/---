import request from '@/utils/request'

export function Logout() {
  return request.get( '/user/Logout')
}
