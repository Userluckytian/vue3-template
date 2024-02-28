/* 防抖 */
export function debonce(fn: Function, delay = 200) {
    let timer: any;
    return function (...arg: any) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            // @ts-ignore
            fn.apply(this, arg)
        }, delay)
    }
}


/* 节流 */
