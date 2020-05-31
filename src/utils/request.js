import axios from 'axios'
import qs from 'qs'


let cancelToken = axios.CancelToken
const cancel = []
const removePending = config => {
    for (let p in cancel) {
        if (cancel[p].u === config.url) {
            cancel[p].f()
        }
    }
}

axios.interceptors.request.use(config => {
    removePending(config)
    config.cancelToken = new cancelToken(c => {
        cancel.push({
            f: c,
            u: config.url,
        })
    })
    return config
}, error => {
    return Promise.reject(error)
})

//添加响应拦截器
axios.interceptors.response.use(response => {
    
    return response
}, error => {
    return Promise.reject(error)
})

export function getAxios(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url,
            params,
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function postAxios(url, data = {}) {

    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url,
            data: qs.stringify(data)
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}