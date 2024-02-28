import { defineStore } from 'pinia'

// 定义状态的类型 一般情况下Pinia会自动推断出state的类型，你就无需定义接口。如果state的数据类型比较复杂，推荐你定义一个接口来描述state的类型
interface socketInfo {
    socket: any
}
// socket对象不需要持久化，持久化的结果也是不对的
const useSocketStore = defineStore('socketInfo', {
    // 基础信息
    state: (): socketInfo => ({
        socket: null, // socket对象
    }),
    // getters的内容(计算属性时使用)
    getters: {},
    // 设置的内容
    actions: {
        // 不使用箭头函数
        setSocket(socket: any) {
            this.socket = socket;
        }
    }
})

export default useSocketStore