import Axios from 'axios'

// 请求拦截器
Axios.interceptors.request.use(() => {

})
// 响应拦截器
Axios.interceptors.response.use(() => {

})

// 默认请求配置
const defaultConfig = {
  url: '',
  timeout: 60000, // 超时时间默认60s
  data: null,
  params: null,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
}

export default function fetch(url = '', config = {}) {
  const fetchConfig = {
    ...defaultConfig,
    ...config
  }
  return Axios({
    url,
    ...fetchConfig
  })
}