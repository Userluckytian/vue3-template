import { ElLoading, ElMessage } from 'element-plus';

type loadingOptionsType = {
    text: string, // 显示在加载图标下方的加载文案
    background: string, // 遮罩背景色
    spinner: string, // 自定义加载图标类名
};
export type reqOptionsType = {
    url: string, // 请求的url
    body?: { [key: string]: unknown },
    params?: { [key: string]: unknown },
    headers?: { [key: string]: unknown },
};

const errCodeDict: any = {
    100: "信息",
    101: "继续",
    103: "切换协议",
    200: "请求成功",
    201: "已创建",
    202: "已接受",
    203: "非授权信息",
    204: "无内容",
    205: "重置内容",
    206: "部分内容",
    300: "多种选择",
    301: "永久移动",
    302: "临时移动", 
    303: "查看其它地址", 
    304: "未修改", 
    305: "使用代理", 
    307: "临时重定向", 
    400: "客户端请求的语法错误，服务器无法理解", 
    401: "请求要求用户的身份认证", 
    403: "拒绝访问", 
    404: "无此接口", 
    405: "客户端请求中的方法被禁止", 
    406: "服务器无法根据客户端请求的内容特性完成请求", 
    407: "请求要求代理的身份认证", 
    408: "请求超时", 
    409: "服务器处理请求时发生了冲突", 
    410: "客户端请求的资源已经不存在", 
    411: "服务器无法处理客户端发送的不带Content-Length的请求信息", 
    412: "客户端请求信息的先决条件错误", 
    413: "由于请求的实体过大，服务器无法处理，因此拒绝请求", 
    414: "请求的URI过长,服务器无法处理", 
    415: "服务器无法处理请求附带的媒体格式", 
    416: "客户端请求的范围无效", 
    417: "服务器无法满足Expect的请求头信息", 
    500: "服务器错误", 
    501: "服务未实现", 
    502: "网关错误", 
    503: "服务不可用", 
    504: "网关超时", 
    505: "HTTP版本不受支持",
    600: '登录过期,请重新登录',
};

/**
 * 获取错误提示码
 *
 * @param {number} code
 * @return {*}  {string}
 */
function errorCodeType(code: number, msg?: string): void {
    let errMessage: string = "未知错误";
    if (msg) {
        errMessage = msg;
    } else {
        if (errCodeDict[code]) {
            errMessage = errCodeDict[code]
        } else {
            errMessage = `其他连接错误 --${code}`;
        }
    }
    ElMessage.error({
        message: errMessage,
        duration: 1500,
        offset: 100,
    })
}

/**
 * 创建全屏的loading实例
 *
 * @return {*} 
 */
function createLoading(loadingOptions?: loadingOptionsType) {
    // 以服务的方式调用的全屏 Loading 是单例的。 若在前一个全屏 Loading 关闭前再次调用全屏 Loading，并不会创建一个新的 Loading 实例，而是返回现有全屏 Loading 的实例
    return ElLoading.service({
        text: loadingOptions?.text || '拼命加载中，请稍后...',
        background: loadingOptions?.background || 'rgba(0, 0, 0, 0.7)',
        spinner: loadingOptions?.spinner || 'el-icon-loading',
    })
}

export { errorCodeType, createLoading }