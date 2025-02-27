/**
 * @description 网络请求工具类
 * @author Mall-Mini-Program
 * @date 2024-01-01
 */

const baseURL = 'https://api.example.com'

const request = (options = {}) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + options.url,
      method: options.method || 'GET',
      data: options.data,
      header: {
        'content-type': 'application/json',
        ...options.header
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          uni.showToast({
            title: res.data.message || '请求失败',
            icon: 'none'
          })
          reject(res)
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '网络错误',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

export const get = (url, data = {}, options = {}) => {
  return request({
    url,
    data,
    method: 'GET',
    ...options
  })
}

export const post = (url, data = {}, options = {}) => {
  return request({
    url,
    data,
    method: 'POST',
    ...options
  })
}

export default {
  get,
  post
}