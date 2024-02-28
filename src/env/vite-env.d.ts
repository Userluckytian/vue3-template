/// <reference types="vite/client" />


// 构建环境变量智能提示效果
interface ImportMetaEnv {
    readonly VITE_BASE_API: string
    readonly VITE_MODE: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}




 // vite.config.ts中使用环境变量的方法：`import { loadEnv } from 'vite'; loadEnv(mode, process.cwd()).VITE_API_URL; mode来自百度一下`
 // vue中使用变量： `直接在ts函数或者变量中使用console.log(import.meta.env.VITE_BASE_URL)`
    


 // 关于组件引入
 declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: ComponentOptions | ComponentOptions['setup']
    export default component
 }

 // js文件引入
 declare module '*.js';

 declare module '*.mjs'
 declare module 'element-plus/dist/locale/zh-cn.mjs';