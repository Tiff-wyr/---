import axios from 'axios'
import router from '../router'
import {Message} from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 50000 // 请求超时时间
})

const fetch = {
  instance(url, data, config, methods='post') {
    return new Promise((resolve, reject) => {
      service[methods](url, data, config).then(res => {
        console.log(res.data.code)
        if(res.data.code == 403){
          Message({
            type: 'info',
            message: '登录状态失效，正在跳转...'
          })
          router.push('/login')
        }
        resolve(res.data)
      }).catch(err => {
        console.log(err);
        Message({
          type: 'error',
          message: err.message
        })
        reject(err)
      })
    })
  },
  post(url, data, config) {
    return this.instance(url, data, config)
  },
  get(url, data, config) {
    return new Promise((resolve, reject) => {
      service.get(url, {
        params: data
      }).then(res => {
        console.log(res.data.code)
        if(res.data.code == 403){
          Message({
            type: 'info',
            message: '登录状态失效，正在跳转...'
          })
          router.push('/login')
        }
        resolve(res.data)
      }).catch(err => {
        console.log(err);
        Message({
          type: 'error',
          message: err.message
        })
        reject(err)
      })
    })
  },

}


export default fetch
