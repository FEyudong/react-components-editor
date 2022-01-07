//容器类型
interface ContainerType {
    width: number;
    height: number;
}
// 画布上的组件块类型
interface BlockType {
    key: string; // 组件类型标识
    left: number; // x位置
    top: number; // y位置
    zIndex: number; // 层叠值
    cursorCenter?: boolean
    isFocus?:boolean
}
// JSONScheme类型
interface JSONSchemeType {
    container?: ContainerType;//画布尺寸信息
    blocks?: BlockType[];//画布上存在的组件块
}
// 物料组件类型
interface CompItemType{
    key:'text'|'button'|'input';//组件类型标识
    label:string; // 组件名称
    preview:string | React.ReactNode; // 预览结果
    render:string | React.ReactNode; // 渲染结果
}