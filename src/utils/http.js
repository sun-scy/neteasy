import { errorHandler } from './error';
import { convertObjToURI, getToken } from './auth_serve'



export default (config, api) => {
  if (api === undefined) {
    throw new Error('该函数第二个参数是必须传的');
  }
  if (!(api instanceof Object)) {
    throw new Error('该函数的第二个参数必须是一个对象');
  }
  if (Object.keys(api).length === 0) {
    throw new Error('该函数第二个参数不能为一个空对象');
  }
  const processedApi = {};
  for (const [name, itemApi] of Object.entries(api)) {
    const {
      method, isForm, hooks, query, url,
    } = itemApi;
    processedApi[name] = async (data = {}, paramsStr) => {
      if (!(data instanceof Object)) {
        throw new Error('参数必须是一个对象');
      }
      if (hooks) {
        Object.assign(processedApi[name], hooks);
      }
      let transformData = null;
      if (isForm && Object.keys(data) !== 0) {
        transformData = new FormData();
        for (const key in data) {
          transformData.append(key, data[key]);
        }
      } else if (query && Object.keys(data) !== 0) {
        transformData = convertObjToURI(data);
      } else {
        transformData = data;
      }
      let newUrl = `/api${url}`;
      if (paramsStr) {
        newUrl = `${newUrl}/${paramsStr}`;
      }
      let result = null;
      let configAxios = null;
      switch (method.toLowerCase()) {
        case 'get':
        case 'delete':
          processedApi[name].beforeReq && processedApi[name].beforeReq();
          configAxios = {
            url: newUrl,
            method,
            params: transformData,
            headers: {
              Authorization: getToken() || ''
            },
          };
          try {
            result = await config(configAxios);
            processedApi[name].receiveRes && processedApi[name].receiveRes();
          } catch (error) {
            errorHandler(error);
          }
          break;
        case 'post':
        case 'put':
          processedApi[name].beforeReq && processedApi[name].beforeReq();
          configAxios = {
            url: newUrl,
            method,
            data: transformData,
            headers: {
              Authorization: getToken() || ''
            },
          };
          if (query) {
            configAxios.headers['content-type'] = 'application/x-www-form-urlencoded';
          }
          try {
            result = await config(configAxios);
            processedApi[name].receiveRes && processedApi[name].receiveRes();
          } catch (error) {
            errorHandler(error);
          }

          break;
      }
      return result;
    };
  }
  return processedApi;
};
