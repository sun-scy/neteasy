import axios from 'axios'
import home from './config'

const homeAxios = axios.create({
    timeout:10000
})

homeAxios.interceptors.request.use((config)=>{
  
    // 因为已经将各个请求模块 通过高阶函数http重新封装了一次
    // 所以有关请求的处理 最好最优都是放在http高阶函数中处理最好
    // const token = localStorage.getItem('token')
    // if(token){
    //     config.headers.Authorization = token
    // }
    return config
})

homeAxios.interceptors.response.use((response)=>{
  
    return response.data
},(error) => {
  
    return Promise.reject(error)
})

export default homeAxios

