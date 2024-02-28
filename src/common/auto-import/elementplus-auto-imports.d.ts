import '@vue/runtime-core'

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        ElCard: typeof import('element-plus/es')['ElCard']
        ElCol: typeof import('element-plus/es')['ElCol']
        ElContainer: typeof import('element-plus/es')['ElContainer']
        ElFooter: typeof import('element-plus/es')['ElFooter']
        ElHeader: typeof import('element-plus/es')['ElHeader']
        ElMain: typeof import('element-plus/es')['ElMain']
        ElOption: typeof import('element-plus/es')['ElOption']
        ElPagination: typeof import('element-plus/es')['ElPagination']
        ElRadioButton: typeof import('element-plus/es')['ElRadioButton']
        ElRadioGroup: typeof import('element-plus/es')['ElRadioGroup']
        ElRow: typeof import('element-plus/es')['ElRow']
        ElSelect: typeof import('element-plus/es')['ElSelect']
        ElTable: typeof import('element-plus/es')['ElTable']
        ElTableColumn: typeof import('element-plus/es')['ElTableColumn']
        Loading: typeof import('element-plus/es')['ElLoadingDirective']
    }
}

export { }