
import axios, { AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { errorCodeType, createLoading } from './utils-require';
import define from '@/common/constant/define.js'
import { useGlobalStateStore } from '@/store/common-store/userInfoStore';
import { debounceLogout } from '@/utils/common-utils/logOut';
import { debonce } from '@/utils/common-utils/debounce-Throttle';
const logOutCodeStatu = [401, 600];
// 创建axios实例
const service = axios.create({
    baseURL: define.preFix, // 服务接口请求相对地址
    timeout: define.reqTimeOut, // 超时设置
    headers: { 'Content-Type': 'application/json;charset=utf-8' }, // 公共部分的请求头 
})

let store: { token: any; };
// 设置loading
let loading: any;
//正在请求的数量
let requestCount: number = 0
//显示loading
const showLoading = () => {
    if (requestCount === 0 && !loading) {
        //加载中显示样式可以自行修改
        loading = createLoading();
    }
    requestCount++;
}
//隐藏loading
const hideLoading = () => {
    requestCount--
    if (requestCount == 0) {
        loading.close()
    }
}
const debonceError = debonce(errorCodeType, 300);
// 请求拦截
service.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
    showLoading()
    if (config.url) {
        // (1)是否传递过来的url中已经包含了http请求前缀
        if (config.url.indexOf('http') > -1) {
            config.baseURL = ''
        }
        // (2) 和风天气直接跳过处理
        if (config.url?.indexOf('https://devapi.qweather.com/') > -1) {
            return config
        }
    }
    // 获取token内容
    if (!store) {
        store = useGlobalStateStore();
    }
    // （3）设置 token放在请求头(后期按需拦截)
    config.headers['Authorization'] = store.token; // 让每个请求携带自定义token 请根据实际情况自行修改
    // config.headers['qvteam-origin'] = 'pc' // 添加其他自定义header的方式
    // （4）get请求，参数在params上，其他请求，参数在data上，这块不做优化了，没必要
    return config
}, error => {
    hideLoading()
    console.log('我报错啦~', error)
    ElMessage.error({
        message: error,
        duration: 1500
    })
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(
    (res: AxiosResponse<any, any>) => {
        hideLoading()
        // 未设置状态码则默认成功状态
        let code = res.status || 200;
        // 获取错误信息
        if (code === 200) {
            const responceNumCode = Number(res.data.code);
            // 状态为200,且接口返回的数据的code也是200
            if (responceNumCode === 200) {
                return Promise.resolve(res.data)
            } else {
                const msg = res.data.msg;
                debonceError(responceNumCode, msg);
                if (logOutCodeStatu.includes(res.status) || logOutCodeStatu.includes(res.data.code)) {
                    debounceLogout();
                }
            }
        } else {
            debonceError(code)
            return Promise.reject(res) as any
        }
    },
    (error: any) => {
        console.log('接口无响应数据时、500、401等会进入这个函数中，接口200的走上面处理，比如接口200但是返回数据的code不是200，走上面');
        hideLoading()
        let { message, response } = error;
        if(response && response.status){
            // 判断是否是401，是的话就直接跳转到登录页，不要乱报一堆错误了，不是的话就正常报错就行了
            if (logOutCodeStatu.includes(response.status)) {
                debounceLogout();
            } else {
                if (message == "Network Error") {
                    message = "后端接口连接异常";
                }
                else if (message.includes("timeout")) {
                    message = "系统接口请求超时";
                }
                debonceError(response.status);
            }
        }
        return Promise.reject(error)
    }
)

export default service;