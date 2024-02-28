import request from '@/api/common-api/core/request';

const baseURL = 'https://devapi.qweather.com/';
const key = 'bb37f49cc9f54e3c9ce8ceb6fc43d62e';
const location = '101181608'; // 新蔡

// 查询天气信息
export function getWeatherData() {
    return request({
        url: `${baseURL}v7/weather/now?key=${key}&location=${location}`,
        method: 'get',
    })
}

// 查询空气质量信息
export function getAQIData() {
    return request({
        url: `${baseURL}v7/air/now?key=${key}&location=${location}`,
        method: 'get',
    })
}