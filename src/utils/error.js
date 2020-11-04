import { Toast } from 'vant';
import router from 'vue'
export const errorHandler = (error) => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400: error.message = '400:请求错误'; break;
      case 401: error.message = '401:用户认证失败'; break;
      case 403: error.message = '403:拒绝访问'; break;
      case 404: error.message = '404:请求出错'; break;
      case 408: error.message = '408:请求超时'; break;
      case 500: error.message = '500:服务器错误'; break;
      case 501: error.message = '501:服务未实现'; break;
      case 502: error.message = '502:网络错误'; break;
      case 503: error.message = '503:服务不可用'; break;
      case 504: error.message = '504:网络超时'; break;
      case 505: error.message = '505:HTTP版本不受支持'; break;
      default: error.message = `${error.response.status}:连接出错!`;
    }
    if (error.response.status === 401) {
      router.push('/401')
    }
    Toast(error.message);
  }

  return Promise.reject(error);
};
