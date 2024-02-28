import request from '@/api/common-api/core/request';

export function login(body: { [key: string]: unknown }) {
    body = {
        // 部分通用参数
        client_id: "admin",
        client_secret: "123456",
        grant_type: "password",
        appFlag: 0, // app: 1; web: 0
        ...body
    }
    return request({
        url: '/api/oauth/Login',
        method: 'post',
        data: body,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

export function getAuthInfo() {
    return request({
        url: '/api/oauth/CurrentUser',
        method: 'get',
        params: {
            applyId: '433630222135488389'
        },
    })
}


// 获取是否需要开启验证码
export function getIsNeedOpenValidCode() {
    return request({
        url: `/api/oauth/getConfig`,
        method: 'get'
    })
}

