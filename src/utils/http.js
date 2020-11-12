import { errorHandler } from './error';
import { convertObjToURI, getToken } from './auth_serve'
export default (config, api) => {


  const processedApi = {};
  for (const [name, itemApi] of Object.entries(api)) {
    const {
      method, hooks, query, url,
    } = itemApi;
    processedApi[name] = async (data = {}, paramsStr) => {
      if (!(data instanceof Object)) {
        throw new Error('参数必须是一个对象');
      }
      if (hooks) {
        Object.assign(processedApi[name], hooks);
      }
      let transformData = null;
      if (query && Object.keys(data) !== 0) {
        transformData = convertObjToURI(data);
      } else {
        transformData = data;
      }
      let newUrl = `/api${url}`;
      if (paramsStr) {
        newUrl = `${newUrl}/${paramsStr}`;
      }
      let result
      let opations = null;
      switch (method.toLowerCase()) {
        case 'get':
        case 'delete':
          processedApi[name].beforeReq && processedApi[name].beforeReq();
          opations = {
            url: newUrl,
            method,
            params: transformData,
            headers: {
              Authorization: getToken() || ''
            },
          };
          try {
            result = await config(opations);
            processedApi[name].receiveRes && processedApi[name].receiveRes();
          } catch (error) {
            errorHandler(error);
          }
          break;
        case 'post':
        case 'put':
          processedApi[name].beforeReq && processedApi[name].beforeReq();
          opations = {
            url: newUrl,
            method,
            data: transformData,
            headers: {
              Authorization: getToken() || ''
            },
          };
          if (query) {
            opations.headers['content-type'] = 'application/x-www-form-urlencoded';
          }
          try {
            result = await config(opations);
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
