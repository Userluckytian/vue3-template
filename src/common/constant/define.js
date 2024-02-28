const APIURl = "http://192.168.1.14:30000";
const frontPerfix = "/maintainapi";
const env = import.meta.env; // https://blog.csdn.net/freedomlulux/article/details/130319155

const define = {
  env: env,
  APIURl: APIURl,
  preFix: frontPerfix,
  WebSocketUrl: APIURl.replace("http", "ws") + "/ws/api/message/websocket",
  reqTimeOut: 10000, // 请求超时时间设置
  routeAnimationDurationTime: 150,
};

export default define;
