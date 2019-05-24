
import request from '@/utils/request'

/**
 * 添加
 * @param img
 * @param name
 */
export function add(data) {
  return request.post( '/repairType/add', data)
}

/**
 * 修改
 */
export function update(data) {
  return request.post('/repairType/update',data)
}

/**
 * 展现列表
 */
export function getAll() {
  return request.get('/repairType/getAll')
}

/**
 * 删除
 */
export function deleteRepair(data) {
  return request.post('/repairType/del',data)
}
