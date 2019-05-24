/**
 * Created by Administrator on 2019/4/29 0029.
 */
import request from '@/utils/request'

export function add(data) {
  return request.post('/user/addAdmin',data)
}
export function update(data) {
  return request.post('/user/updateAdmin',data)
}
export function delRepair(data) {
  return request.post('/user/delAdmin',data)
}
export function getAll() {
  return request.get('/user/getAdmin')
}
