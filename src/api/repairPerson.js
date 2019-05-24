import request from '@/utils/request'

export function add(data) {
  return request.post('/user/addRepair',data)
}
export function update(data) {
  return request.post('/user/updateRepair',data)
}
export function delRepair(data) {
  return request.post('/user/delRepair',data)
}
export function getAll() {
  return request.get('/user/getRepair')
}
