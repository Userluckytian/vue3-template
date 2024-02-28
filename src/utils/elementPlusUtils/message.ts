/**
 * 封装一下element-plus的ElMessage
 *  
 */ 


import { ElMessage } from "element-plus";

type msgType = 'success' | 'warning' | 'info' | 'error';


export function alertElmessage(msgType: msgType, text: string, duratino: number=1500) {
    ElMessage({
        type: msgType,
        message: text,
        duration: duratino,
        offset: 100,
    })
};