import { defineStore } from 'pinia';

interface GlobalState {
    token: string,
    userInfo: any
}

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useGlobalStateStore = defineStore({
    id: 'GlobalState', // id: 必须的，在所有 Store 中唯一
    // state: 返回对象的函数
    state: (): GlobalState => ({
        token: '',
        userInfo: {}
    }),
    getters: {},
    actions: {
        // 不使用箭头函数
        setToken(token: string) {
            this.token = token;
            sessionStorage.setItem('jnpf_token', token + '|String');
        },
        setUserInfo(userInfo: any) {
            this.userInfo = userInfo;
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
                key: 'GlobalState',
                storage: localStorage,
                // storage: sessionStorage,
            }
        ]
    }
});