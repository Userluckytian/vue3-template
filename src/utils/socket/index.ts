
import { ElMessage } from 'element-plus';

// 心跳检测, 每隔一段时间检测连接状态，如果处于连接中，就向server端主动发送消息，来重置server端与客户端的最大连接时间，如果已经断开了，发起重连。
var heartCheck = {
    // 100秒发一次心跳，比server端设置的连接时间稍微小一点，在接近断开的情况下以通信的方式去重置连接时间。
    timeout: 100000,
    serverTimeoutObj: null
};

// socket通信store
import useSocketStore from "@/store/business-store/socket";
import { useGlobalStateStore } from '@/store/common-store/userInfoStore';
/**
 *  实例化socket对象
 * @param url socket地址
 * @returns 
 */
export function initSocket(url: string) {
    let store = useGlobalStateStore();
    if (store.token) {
        const socketUrl = url + '?token=' + store.token
        try {
            const socket = new WebSocket(socketUrl);
            // 直接添加上打开和关闭事件
            addSocketLinstener(socket, "onCloseEvent");
            const socketStore = useSocketStore();
            socketStore.setSocket(socket);
            return socket;
        } catch (error) {
            console.error(error, 'socket构建失败！');
            return null;
        }
    }
    return null;
}


/**
 * 添加socket监听事件
 *
 * @export
 * @param {*} socket websocket对象
 * @param {*} flag 监听事件标识
 */
export function addSocketLinstener(socket: any, flag: string, callback?: (e) => void) {
    if (socket) {
        switch (flag) {
            case "onOpenEvent":
                // 快速建立链接
                socket.onopen = () => {
                    let store = useGlobalStateStore();
                    const tokenString = store.token;
                    const onConnection = {
                        method: "OnConnection",
                        token: tokenString,
                        mobileDevice: false
                    };
                    socket.send(JSON.stringify(onConnection));
                    if (callback) {
                        callback('link successfully');
                    }
                };
                break;
            case "onMessageEvent":
                socket.onmessage = event => {
                    const data = JSON.parse(event.data);
                    addCommonListenerMessage(socket, data);
                    if (callback) {
                        callback(data);
                    }
                };
                break;
            case "onCloseEvent":
                socket.onclose = () => {
                    if (heartCheck.serverTimeoutObj) {
                        clearTimeout(heartCheck.serverTimeoutObj);
                        heartCheck.serverTimeoutObj = null;
                    }
                };
                break;
            default:
                break;
        }
    }
}


/** 监听的通用部分的消息
 * 
 * @param socketObj 
 * @param data 
 */
export function addCommonListenerMessage(socketObj, data) {
    // 用户在线
    if (data.method == "Online") {
    }
    // 用户离线
    if (data.method == "Offline") {
    }
    // 用户过期或者断开连接
    if (data.method === "logout" || data.method === "closeSocket") {
        if (socketObj) {
            socketObj.close();
            socketObj = null;
        }
        if (heartCheck.serverTimeoutObj) {
            clearTimeout(heartCheck.serverTimeoutObj);
            heartCheck.serverTimeoutObj = null;
        }
        if (data.method === "logout") {
            ElMessage({
                message: data.msg || "登录过期,请重新登录",
                type: "error",
                duration: 1000,
                onClose: () => { }
            });
        }
    }
}
