import { render } from "vue";

/** 获取组件实例（
 * 这个好像不用考虑销毁的情况，
 * 因为我是用在popup弹窗中的，弹出来的时候我在F12中的element中能搜索到弹窗的元素，
 * 但是popup关闭时，就搜索不到了，
 * 我考虑先用这个。这个使用实例可以在
 * https://github.com/marsgis/mars3d-vue-example/blob/master/src/widgets/basic/query-poi/map.ts
 * 的第50行找到）
 * 
 * @param component 
 * @param props 
 * @returns 
 */
export function getComponetInstance(component: any, props: any) {
    const vNodeDom = document.createElement("div")
     // tip: 注释下面这行。不要添加到body中。
    // document.body.appendChild(vNodeDom);
    const vNode = createApp(component, { ...props });
    vNode.mount(vNodeDom);
    return vNode._container // 项目中可以直接返回DOM
    // return (vNode as any)._container.innerHTML // 示例中特殊处理，转为html元素
}


/**举例：  (这个在工艺项目中测试使用的，工艺中不会用一下就移除，所以没有考虑销毁的情况)
 * props: { message: 'Hello World' }
 * const parentNode = document.createElement('div');
 * parentNode.setAttribute("class", "mxgraph-switch");
 * parentDom：parentNode
 * @param {object} options 配置参数
 */
export const createComponentInstance = (options: any) => {
    const { props, parentDom, component } = options;
    // 虽然我的这个组件不需要，但是message提醒组件好像需要，先留着吧，可以参考下最上面的b站视频
    const destroyFn = () => {
        render(null, parentDom);
    }
    // 创建虚拟dom元素 示例： h(MyComponent, { props: { message: 'Hello World' } });
    const vnode = h(component, { props: props })
    // 渲染真实dom
    render(vnode, parentDom);
    return vnode;
}