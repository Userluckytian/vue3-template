import { logout } from "@/api/common-api/login/logOut";
import { alertElmessage } from "../elementPlusUtils/message";
import { useAnimationStatusStore } from "@/store/common-store/animationStore";
import { useGlobalStateStore } from "@/store/common-store/userInfoStore";
import { navTo } from "@/router/common-router/utils-router";
import { debonce } from "./debounce-Throttle";

/*
    退出登录两件事
    (1) 退出登录调用接口
    (2)清空全部store并跳转到登录页
*/

export const debounceLogout = debonce(logOut, 300); // 使用: debounceLogout(xxx),其中的xxx会传递给内部

/**
 * 退出登录
 *
 * @export
 */
function logOut(sendReq: boolean = false) {
    if (sendReq) {
        logout().then((res: any) => {
            if (res.code === 200) {
                navToLogin(); // 一定先退出
                resetAllStore();
            } else {
                alertElmessage('error', res.msg);
            }
        })
    } else {
        navToLogin(); // 一定先退出
        resetAllStore();
        alertElmessage('error', '登录过期，请重新登录');
    }
}

/**
 * 重置全部Store
 *
 */
function resetAllStore() {
    useAnimationStatusStore().reset();
    useGlobalStateStore().reset();
}

/**
 * 跳转到登录页
 *
 */
function navToLogin() {
    navTo('/login');
}