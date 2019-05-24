/**
 * Created by Administrator on 2019/5/12 0012.
 */
import request from '@/utils/request'

//发送验证码
export function sendCode(data) {
  return request.get('/message/getCode',data)
}
//检查手机
export function checkPhone(data) {
  return request.post(`/message/checkPhone`,data)
}
export function conform(data) {
  return request.post(`/message/conform`,data)
}
export function setNewPass(data) {
  return request.post(`/message/setNewPass`,data)
}
