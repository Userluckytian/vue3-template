import { createRouter, createWebHashHistory, RouterOptions, Router } from 'vue-router'
//由于router的API默认使用了类型进行初始化，内部包含类型定义，所以本文内部代码中的所有数据类型是可以省略的
// 引入消息弹窗
import { ElMessage } from 'element-plus';
// 引入store
import { useGlobalStateStore } from '@/store/common-store/userInfoStore';
import { useAnimationStatusStore } from '@/store/common-store/animationStore';


// 配置的路由路径
import routes from '../business-router/router';
import define from '@/common/constant/define.js'

// RouterOptions是路由选项类型
const options: RouterOptions = {
    history: createWebHashHistory(),
    routes,
}

// Vue-router新版本中，需要使用createRouter来创建路由, Router是路由对象类型
const router: Router = createRouter(options)

const whiteList = ['/login']; // 路由通过白名单


/**
 * 检验单点登录是否可以通过
 *
 * @export
 * @param {*} to
 * @param {(e: any) => void} next
 */
function allowNext(next: Function) {
    const animation = useAnimationStatusStore();
    animation.setAnimationStatus(true);
    // setTimeout(() => {
    // }, define.routeAnimationDurationTime);
    next();
}
/**
 * 检验单点登录是否可以通过
 *
 * @export
 * @param {*} to
 * @param {(e: any) => void} next
 */
function validSingleLogin(to: any, next: Function, store: any) {
    if (to.query && to.query.token) {
        const tempToken = to.query.token;
        store.setToken(tempToken);
        allowNext(next);
    } else {
        ElMessage.error('您还没有登录，请先登录');
        next('/login');
    }
}


/**
 * 全局前置路由守卫，每一次路由跳转前都进入这个 beforeEach 函数
 */
router.beforeEach((to: any, _from: any, next: Function) => {
    if (whiteList.includes(to.path)) {
        // 登录或者注册才可以往下进行
        next();
    } else {
        // 获取 token
        const store = useGlobalStateStore();
        const token = store.token;
        // token 不存在
        if (!token) {
            // 校验是否是单点登录
            validSingleLogin(to, next, store);
        } else {
            // 直接通过
            allowNext(next);
        }
    }
});

// 进入路由后
router.afterEach((_to: any, _from: any, _next: any) => {
    // 作用1：修改每个页面的title（我不需要）
    // to.meta && (document.title = to.meta.title)
    // 作用2：每次切换页面的时候，让页面滚动到最顶部（我不需要）
    // window.scrollTo(0, 0)
    // 作用3：修改全局动画变量状态（好像不太行。。。）
    // const animation = useAnimationStatusStore();
    // animation.setAnimationStatus(true);
})



export default router