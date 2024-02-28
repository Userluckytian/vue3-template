import { createApp } from 'vue'
// 部分自定义样式
import './styles/style.css'
import './styles/marsCesium.css'

// 引入element-plus相关样式
import 'element-plus/dist/index.css'

// 和风天气
import '/public/common-public/ov_weather/font/qweather-icons.css';

import router from '@/router/common-router' // ++ 步骤配置 导入router
import pinia from "@/store/common-store/index"; // ++ 步骤配置 导入pinia

// 依赖库1： mars 3D
import "mars3d-cesium/Build/Cesium/Widgets/widgets.css"
import "mars3d/dist/mars3d.css"

// 依赖库2： echarts
import * as echarts from 'echarts'
import { provide } from 'vue' // 用于将echarts作为全局变量提供出去

// 依赖库3： DataV 官网地址：https://datav-vue3.netlify.app/Guide/Guide.html
import DataVVue3 from '@kjgl77/datav-vue3'

// 依赖库4: 图片预览 使用参考:https://blog.csdn.net/ymzhaobth/article/details/122127852
import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer'

// 国际化：
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 引入elementPlus Icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import resizeDirective from './directives/resizeDirective';

const app = createApp(App);
// 注册指令(未生效，应该有问题)
app.directive('windowResize', resizeDirective);

// window.onload = function () {
//     console.log(213);
//     (document.body.style as any).zoom = "50%";
// }
app.provide('$echarts', echarts); // ++ 挂载全局变量
// app.config.globalProperties.$echarts = echarts; // ++ 挂载全局变量
// 注册elementPlus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 数字滚动效果组件
import NumCountUp from "@/components/numCountUp/numCountUp.vue";
app.component('NumCountUp', NumCountUp)

app
    .use(ElementPlus, {
        locale: zhCn,
        size: 'large'
    }) // elementplus 国际化
    .use(VueViewer) // ++ 挂载VueViewer图片预览
    .use(DataVVue3) // ++ 挂载DataV
    .use(router) // ++ 挂载路由
    .use(pinia) // ++ 挂载store
    .mount('#app')
