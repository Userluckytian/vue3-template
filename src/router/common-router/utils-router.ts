
import router from '@/router/common-router/index' // ++ 步骤配置 导入router

/**
 * 路由导航
 *
 * @export
 * @param {string} url 路由路径
 * @param {*} params 请求参数
 */
export function navTo(url: string, data?: any) {
    router.push({
        path: url,
        query: data || null,
    });
}

/**
 * 获取路由参数
 *
 * @export
 * @return {*} 
 */
export function getRouteParams() {
    return router.currentRoute.value.query;
}
/**
 * 获取路由信息
 *
 * @export
 * @return {*} 
 */
export function getRouteInfo() {
    return router.currentRoute.value;
}


