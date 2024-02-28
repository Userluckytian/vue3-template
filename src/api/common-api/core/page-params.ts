// 全局统一分页参数类型声明 
declare interface PageParams {
    pageNum: number, 
    pageSize: number, 
    type?: Model, // 可选参数 
    readonly sort?: string // 只读可选参数 
}
interface Model {
    type?: string
}
export default PageParams; 