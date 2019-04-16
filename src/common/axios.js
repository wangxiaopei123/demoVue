import Axios from 'axios'
import QS from 'qs' // 引入qs模块，用来序列化post类型的数据
import common from './common.js'

let globalData = {//全局变量
     basePath: common.CONSTANT.UPLOADIMGPATH  //接口服务器
};


Axios.defaults.timeout = 10000; // 5s没响应则认为该请求失败
Axios.defaults.withCredentials = true;	// 跨域时如果要带上cookie话则需要设置withCrendentials


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        Axios.get(globalData.basePath + url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err)
        })
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    console.info(globalData.basePath + url)
    return new Promise((resolve, reject) => {
        Axios.post(globalData.basePath + url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        Axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        Axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}
