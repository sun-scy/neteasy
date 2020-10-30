const baseUrl = process.env.VUE_APP_API_BASE_URL

function convertObjToURI(paramsObj = {}) {
    return Object.keys(paramsObj).map((k) => (encodeURIComponent(k) + "=" + encodeURIComponent(paramsObj[k]))).join('&');
}
export default (config, api) => {
    if (api === undefined)
        throw new Error('该函数第二个参数是必须传的')
    if (!(api instanceof Object))
        throw new Error('该函数的第二个参数必须是一个对象')
    if (Object.keys(api).length === 0)
        throw new Error('该函数第二个参数不能为一个空对象')
    let processedApi = {}
    for (let [name, itemApi] of Object.entries(api)) {

        /* 
        url:请求路径
        method:请求方式
        isForm:formdata请求
        hook函数勾子
        crosUrl:跨域地址
        needToken：是否需要token
        postWithUrlencode ：是否是urlencoded格式
        */
        let {
            method,
            isForm,
            hooks,
            needToken,
            query,
            url
        } = itemApi
        processedApi[name] = async (data = {}, paramsStr) => {
            if (!(data instanceof Object)) {
                throw new Error('参数必须是一个对象')
            }
            if (hooks) {
                Object.assign(processedApi[name], hooks)
            }
            let transformData = null
            if (isForm && Object.keys(data) !== 0) {
                transformData = new FormData()
                for (let key in data) {
                    transformData.append(key, data[key])
                }
            } else if (query && Object.keys(data) !== 0) {
                transformData = convertObjToURI(data)
            } else {
                transformData = data
            }
            let newUrl = '/api'+ url
            if (paramsStr) {
                newUrl = newUrl + '/' + paramsStr
            }
            let result = null
            let configAxios = null
            switch (method.toLowerCase()) {
                case 'get':
                case 'delete':
                    processedApi[name].beforeReq && processedApi[name].beforeReq()
                    configAxios = {
                        url: newUrl,
                        method,
                        params: transformData,
                        headers: {}
                    }
                    if (needToken) {
                        configAxios.headers.Authorization = localStorage.getItem('token') || ''
                    }
                    result = await config(configAxios)
                    processedApi[name].receiveRes && processedApi[name].receiveRes()
                    break;
                case 'post':
                case 'put':
                    processedApi[name].beforeReq && processedApi[name].beforeReq()
                    configAxios = {
                        url: newUrl,
                        method,
                        data: transformData,
                        headers: {}
                    }
                    if (needToken) {
                        configAxios.headers.Authorization = localStorage.getItem('token') || ''
                    }
                    if (query) {
                        configAxios.headers['content-type'] = 'application/x-www-form-urlencoded'
                    }
                    console.log(configAxios)
                    result = await config(configAxios)
                    processedApi[name].receiveRes && processedApi[name].receiveRes()
                    break;
            }
            return result
        }
    }
    return processedApi
}