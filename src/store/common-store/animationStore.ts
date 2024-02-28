import { defineStore } from 'pinia';

type AnimationState = {
    status: boolean,
}

// 定义动画过渡状态所需要的变量（存储为全局）
export const useAnimationStatusStore = defineStore({
    id: 'animationStatus', // id: 必须的，在所有 Store 中唯一
    // state: 返回对象的函数
    state: (): AnimationState => ({
        status: true,
    }),
    getters: {},
    actions: {
        // 不使用箭头函数
        setAnimationStatus(status: boolean) {
            this.status = status;
        },
        reset() {
            this.$reset();
        },
    },
    // 持久化
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'animationStatus',
                storage: localStorage,
                // storage: sessionStorage,
            }
        ]
    }
});
