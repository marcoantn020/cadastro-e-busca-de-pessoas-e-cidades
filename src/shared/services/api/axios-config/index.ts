import axios from 'axios'
import { Environment } from '../../../environment'
import { errorInterceptor, responseInterceptor } from './interceptors'

const Api = axios.create({
  baseURL: Environment.URL_BASE
  // headers: {
  //   Authorization: `Bearer ${JSON.parse(localStorage.getItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN) || '')}`
  // }
})

Api.interceptors.response.use(
  (response) => responseInterceptor(response), 
  (error) => errorInterceptor(error)
)

export { Api }
