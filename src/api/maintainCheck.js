/**
 * Created by Administrator on 2019/4/29 0029.
 */
import request from '@/utils/request'


export function update(data) {
  return request.post('/maintain/update',data)
}

export function get(data) {
  return request.get(`/maintain/get`,data)
}

