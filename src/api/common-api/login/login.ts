import request from '@/api/common-api/core/request';

export function login(body: { [key: string]: unknown }) {
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



