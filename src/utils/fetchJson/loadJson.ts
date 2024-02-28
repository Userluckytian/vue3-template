
// 获取json数据
export function getLocalJsonData(jsonUrl) {
   return fetch(jsonUrl)
        .then((response: any) => response.json())
        .catch((error: any) => {
            console.log('获取json数据错误 Error:', error);
        });
}