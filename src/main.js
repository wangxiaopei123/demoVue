import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Axios from 'axios'
import common from '../src/common/common.js'
import {post,get,patch,put} from '../src/common/axios.js'
import BaiduMap from 'vue-baidu-map'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.prototype.common = common
Vue.prototype.$get=get;
Vue.prototype.$post=post;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.use(BaiduMap, {
    ak: 'U0RaXjjCL1CSXLOoD5Xn5pRMcU5iGaTa'
})

const router = new VueRouter({
  routes
});
//图片上传用的是这个axios,勿删
const axios=Axios.create({
    // baseURL:'http://127.0.0.1/', // 通常配置基础的接口入口地址
    timeout:60000, // 请求超时时间
    headers:{// 这里可设置所有的请求头
        'Content-Type':'application/x-www-form-urlencoded', //该项建议设置 如果未 POST请求时 数据未做处理时会出现错误，最理想的解决方法就是 直接设置该项
    },
    withCredentials:true,//是否允许发送Cookie 如果为true 则服务器的 Access-control-Allow-Credentials 必须为 true 来源为 XMLHttpRequest的withCredentials配置项
    // 以下两项为拦截器配置 可最后再看
    transformRequest: [function (data) {//准备发送请求触发的事件 类型：Array || Function 可以是一个函数或数组 data 为发送的数据 get 为undefined
        // 此处可对发送的数据进行处理
        return data; //最终数据
    }],
    transformResponse: [function (data) {//接收到数据首先处理的函数 ，data 为服务器返回的数据（// 1.响应结构 里的  rs.data）
        return data;//最终数据
    },function (data) {//当为数组时 窜行操作  data 为上一步中的最终数据
        return data;
    }],
});
axios.all=Axios.all; // 由于使用create方法返回的 实例缺少了 all 方法 在这里 加进去 all() 方法主要用于并发请求
Vue.prototype.$axios=axios; // 绑定到 Vue 实例中 如果不进行create()配置可直接：Vue.prototype.$http=Axios;

new Vue({
	router,
  el: '#app',
  render: h => h(App)
})
