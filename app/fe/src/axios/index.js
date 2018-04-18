import axios from 'axios'

export default axios.create({
  baseURL: process.env.NODE_ENV == 'production'?'':'http://localhost:7001',
  timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'}
})
