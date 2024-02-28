import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { mars3dPlugin } from "vite-plugin-mars3d"
// import viteCompression from 'vite-plugin-compression';
import define from './src/common/constant/define.js';

// #region 自动导入工具依赖库
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// #endregion

const pathSrc = resolve(__dirname, 'src');
const pathPublic = resolve(__dirname, 'public');
// https://vitejs.dev/config/
export default ({ mode }) => {
  const isDev = mode === 'development';
  const isTest = mode === 'devTest'
  const base = isDev ? "./" : (isTest ? "/xcovnewdev/" : "/xcovnew/");
  return defineConfig({
    base: base,//开发或生产环境服务的公共基础路径
    publicDir: pathPublic, // 把当前目录直接复制过去？
    plugins: [
      vue(),
      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue"],

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver(),

          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: "Icon",
          }),
        ],

        dts: resolve(pathSrc, "common/auto-import/auto-imports.d.ts"),
      }),
      // 引入mars3D
      mars3dPlugin(),
      // 自动导入 Element Plus 组件
      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"],
          }),
          // Auto register Element Plus components

          ElementPlusResolver(),
        ],

        dts: resolve(pathSrc, "common/auto-import/components.d.ts"),
      }),
      // 图标
      Icons({
        autoInstall: true,
      }),
      // viteCompression({
      //   deleteOriginFile: true, // 压缩后是否删除源文件
      //   algorithm: 'gzip', // 压缩算法,
      //   ext: 'gz', // 生成的压缩包后缀
      //   threshold:  2048, // 体积大于 threshold 才会被压缩,单位 b
      // }),
    ],
    resolve: {
      alias: {
        '@': pathSrc,
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'] // 打开这句话就会报错，ca0
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 两种方式都可以
          additionalData: '@import "@/styles/font.scss";@import "@/styles/scrollBar.scss";@import "@/styles/global.scss";'
          // additionalData: '@use "@/assets/scss/global.scss" as *;'
        }
      }
    },
    build: {
      target: 'modules', // 设置最终构建的浏览器兼容目标  //es2015(编译成es5) | modules
      outDir: 'dist',  // 构建得包名  默认：dist
      assetsDir: 'assets',  // 静态资源得存放路径文件名  assets
      minify: 'terser', // 项目压缩 :boolean | 'terser' | 'esbuild'
      chunkSizeWarningLimit: 1000, //chunk 大小警告的限制（以 kbs 为单位）默认：500
      sourcemap: false, // 构建后是否生成 source map 文件
      cssTarget: 'chrome61', //防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式  (要兼容的场景是安卓微信中的 webview 时,它不支持 CSS 中的 #RGBA 十六进制颜色符号)
      terserOptions: {
        compress: {
          drop_console: true, // 正式环境过滤console.log()
          drop_debugger: true // 正式环境过滤debugger
        },
        // 10月更新
        output: {
          comments: true, // 去掉注释内容
        },

      },
      rollupOptions: {
        output: {
          manualChunks: {
            // 指定模块和它们应该放入的块名称
            moment: ['moment'],  // https://cn.rollupjs.org/configuration-options/#output-manualchunks
            mars3d: ['mars3d'],
            wellknown: ['wellknown'],
            echarts: ['echarts', 'echarts-liquidfill', 'echarts-wordcloud'],
            'element-plus': ['@element-plus/icons-vue', 'element-plus'],
          }
        }
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      https: false, // 是否开启 https
      open: true, // 是否自动在浏览器打开
      cors: true, // 允许跨域  8月更新
      proxy: {
        // 使用 proxy 实例
        '/maintainapi': {
          target: define.APIURl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/maintainapi/, ''),
        },
        // 代理 WebSocket 或 socket
        '/socket.io': {
          target: define.WebSocketUrl,
          ws: true
        }
      }
    }
  })
}
