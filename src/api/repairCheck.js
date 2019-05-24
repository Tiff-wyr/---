/**
 * Created by Administrator on 2019/4/29 0029.
 */
import request from '@/utils/request'


export function update(data) {
  return request.post('/repair/updateStatus',data)
}
export function get(data) {
  return request.get('/repair/get',data)
}

