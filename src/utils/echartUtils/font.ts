/* echart文字大小自适应: https://blog.csdn.net/m0_68937827/article/details/126405672 */


const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
/**
 * echart文字大小自适应
 *
 * @param {*} sizeValue 28px就写0.28
 * @return {*} 
 */
export function autoFontSize(sizeValue: number) {
    if (!clientWidth) return;
    const ovClientWidth = 7496; // 临时调整尺寸为大屏尺寸
    // 比率小于1 时，重新设置为1
    let raito = 1;
    if ((ovClientWidth / 1920) > 1) {
        raito = ovClientWidth / 1920;
    }
    let fontSize = 100 * raito;
    return sizeValue * fontSize;
};

export function bigGridView() {
    if ((clientWidth / 1920) > 1) {
        return true
    }
    return false;
}

export function getViewRadio() {
    return (clientWidth / 1920) > 1 ? (clientWidth / 1920) : 1;
}
