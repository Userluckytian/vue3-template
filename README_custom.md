# 框架内容
## 技术架构：

      Vue 3 + TypeScript + Vite + elementPlus + pinia + vue-router4 + axios

## 架构简单说明：

      举个简单的例子：src/api目录下一般放 
            1：axios构建的通用拦截器（request.ts）
            2：项目会用到的接口，如登录接口等。
      我考虑建2个目录： 
            一个src/api/common-api目录（放上面1的内容）
            一个src/api/business-api目录。（放业务系统的接口信息，即上面的2）
      新增：
            由于一个业务系统一般会有几个模块，【登录模块】、【首页】、【个人中心】。基于此，我会在src/api/business-api目录构建多个不同的文件。
            举个例子：假设你的项目有登录页面（login）+首页（home）。我会在下面新建两个文件：
            文件1：src/api/business-api/login.ts （存放登录页面用到的接口）
            文件2：src/api/business-api/home.ts（存放首页页面用到的接口）

      其他目录同理（涉及目录： src/api、 src/router、src/store、src/views, 其他目录根据需要调整 ）
      utils用于存放一些格式化的工具函数。但是，针对api、router、store的工具函数会放在各自目录下，不放在utils下！

## 搭建过程
（0）Vite 需要 Node.js 版本 14.18+，16+。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。

      本项目node:v16.13.2

（1）根据vite官网，创建项目。并解决掉 import 引入语法报红色波浪线的问题（如果有）。参考：

      https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project

（2）安装scss样式预处理器， src下新建styles文件夹，将全局的样式全部放到styles目录下。 参考：
      
      https://blog.csdn.net/Th_rob/article/details/125595743

（3）构建开发环境和正式环境的环境变量，并配置开发时使用的开发服务器的相关信息,且正式环境过滤console和debugger。参考：
      
      1：https://blog.csdn.net/qq_44848480/article/details/131434199?spm=1001.2101.3001.6650.5&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-5-131434199-blog-124665926.235%5Ev38%5Epc_relevant_anti_t3_base&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-5-131434199-blog-124665926.235%5Ev38%5Epc_relevant_anti_t3_base&utm_relevant_index=6
      2：https://segmentfault.com/a/1190000043467574  
      3: https://blog.csdn.net/weixin_43655409/article/details/125849452
      
（4）引入axios，并封装。可参考：

      https://juejin.cn/post/7130289889597685773#heading-9

（5）引入路由。可参考：

      1：https://juejin.cn/post/7080034495662915592
      2：https://blog.csdn.net/qq_43968562/article/details/129303744

（5）引入状态管理pinia。可参考：

      https://juejin.cn/post/7103712125482172424


可参考：[Vue3-Vite-TS-AntD项目搭建](https://blog.csdn.net/qq_37148353/article/details/124555249)

### 问题参考：

      (1)https://blog.csdn.net/weixin_48337566/article/details/128609494

      (2)import引入使用别名报红波浪线的解决办法： 
            第一步： https://juejin.cn/post/7130887368042610718（修改vscode的volar 和 typescript（如果有）配置项）
            第二步（如果你的ts文件（非vue文件）也报错的话）：把在tsconfig.json中新增的配置项在tsconfig.node.json中也写一份。



### 后期完善：

      （1） 服务器端返回路由
            参考： https://router.vuejs.org/zh/guide/advanced/transitions.html
      （2）应用规模化（点下面的链接。在浏览器中全局搜索`应用规模`几个字）
            https://cn.vuejs.org/guide/scaling-up/sfc.html
      （3）加解密工具集，放到utils目录下。举例：AES加解密
      

## 项目参考：
      （1） http://mars3d.cn/project/vue/zhyq.html


## 项目开发问题：
###  pinia的store存储的地图对象在页面F5刷新后获取不到。
      本来考虑，通过pinia的store获取到地图对象在显示图层操作的按钮（显示，隐藏），后来发现初始化获取不到。最终采取的办法：修改对store里的内容的使用方式（用的时候再拿，不要初始化就要，可能获取不到）

## 项目打包问题：
### 假设你的public目录是build构建时，不需要修改，直接拷贝到dist目录下的内容
      （1）在你的vue文件的template模板中 
            我们创建img标签时可能的写法：
                  ①   <img src="/public/business-public/subtitle_two.webp" /> // 开发环境正常
                  ②   <img src="/business-public/subtitle.webp" /> // 开发环境正常、正式环境异常常
                  ③   <img src="business-public/subtitle_two.webp" /> // 开发环境正常、正式环境正常
                  ②   <img src="~/business-public/subtitle.webp" /> // （有的时候这样写也可以。。。）
            见：https://www.reddit.com/r/vuejs/comments/ufa2mu/vite_rollup_failed_to_resolve_import_imagepng/?rdt=61936
      （2）在你的vue文件的<script>标签中
            import xxx from '/public/xxx'  // 开发环境正常
            import xxx from '/xxx'  // 开发环境正常
            import xxx from 'xxx'  // 开发环境正常，只有这个正式环境才是正常的

            问： 那script标签中非import方式引入的路径呢？
            没关系你可以按照上面三种方式挨个试一下，（当然我是知道：第三种是可以的）

      （3）在你的vue文件的<style>标签中，也许你注意到了background-image: url(xxx);这里也会出现图片路径问题。

            background-image: url('/public/business-public/subtitle.webp')  // 开发环境正常
            background-image: url('business-public/subtitle.webp')  // 开发环境正常
            background-image: url('/business-public/subtitle.webp')  // 开发环境正常，只有这个正式环境才是正常的

      (4) 只有这些是不够的，你还要看一下vite.config.ts文件的配置，以及tsconfig.json的配置。
### 打包报错：[vite]: Rollup failed to resolve import "image" from
      （1）确保所有图片在使用时，不直接写在模板中。如：
      ❌错误的写法
      <template>
           <img src="/business-public/xxx.png"></img> 
      </template>
      ✅正确的写法
           <template>
                  <img :src="pngfile"></img> 
            </template>
            <script>
                  import pngfile from '/business-public/image/xxx.png';
            </script>
 

## 项目性能优化：
（1） [vite-plugin-compression](https://github.com/vbenjs/vite-plugin-compression/blob/main/README.zh_CN.md)
（2） [检测 JavaScript 代码中可能导致内存泄漏的工具](https://www.cnblogs.com/yuzhihui/p/17178897.html)
（3） [前端性能优化——启用文本压缩](https://www.cnblogs.com/yuzhihui/p/17211727.html)
（4） [The Three Cs: 🤝 Concatenate, 🗜️ Compress, 🗳️ Cache, 简称3C](https://csswizardry.com/2023/10/the-three-c-concatenate-compress-cache/)