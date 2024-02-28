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




