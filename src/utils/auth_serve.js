
import { TOKEN } from './storage_type'
// object --> urlencoded
export const convertObjToURI = (paramsObj = {}) => {
   return Object.keys(paramsObj)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(paramsObj[k])}`)
      .join('&');
}

//读取token
export const getToken = () => {
   return localStorage.getItem(TOKEN)
}

//存储token
export const setToken = (value) => {
   return localStorage.setItem(TOKEN, value)
}