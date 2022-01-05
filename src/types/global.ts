//容器类型
interface ContainerType {
    width: number;
    height: number;
}
// 画布上的组件块类型
interface BlockType {
    key: string;
    left: number;
    top: number;
    zIndex: number;
    cursorCenter?: boolean
    isFocus?:boolean
}
// JSONScheme类型
interface JSONSchemeType {
    container?: ContainerType;
    blocks?: BlockType[];
}
// 物料组件类型
interface CompItemType{
    key:'text'|'button'|'input';
    label:string;
    preview:string | React.ReactNode;
    render:string | React.ReactNode;
}