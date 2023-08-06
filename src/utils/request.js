import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'

// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
request.interceptors.request.use(
  (config) => {
    // do something before request is sent
    const { token = '' } = store.state.user
    if (token) {
      // let each request carry token
      // please modify it according to the actual situation
      config.headers['Authorization'] = `Bearer ${token}`
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log('interceptors', error) // for debug
    return Promise.reject(error)
  }
)

// // response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data
    const { code, message, success } = res
    if (code !== 2000 && !success) {
      Message({
        message: message || '系统错误',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(res)
    }

    if (message) {
      Message({
        message: message,
        type: 'success',
        duration: 3 * 1000
      })
    }

    return Promise.resolve(res)
  },
  (error) => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default request
