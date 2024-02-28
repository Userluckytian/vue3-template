import request from '@/api/common-api/core/request';

export function logout() {
    return request({
        url: '/api/oauth/Logout',
        method: 'get'
    })
}