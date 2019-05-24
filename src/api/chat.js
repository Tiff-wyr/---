/**
 * Created by Administrator on 2019/5/4 0004.
 */
import request from '@/utils/request'

export function getType(data) {
  return request.get(`/chat/getType`,data)
}

