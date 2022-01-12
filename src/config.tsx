import {Button,Input} from 'antd';
/**
 * 创建初始化配置
 * @returns 组件配置
 */
function createEditorConfig(){
    // 物料列表 作用:物料区渲染物料列表
    const compList:CompItemType[] = [];
    // 物料映射: 物料标识=>物料信息的映射。作用:方便画布上通过物料标识找到对应组件进行渲染
    const compMap:{
        [k:string]:CompItemType
    } = {};

    return {
        // 暴露一个注册物料方法，同时去更新物料List&Map
        register:(comp:CompItemType)=>{
            compList.push(comp);
            compMap[comp.key] = comp
        },
        compList,
        compMap
    }
}
export const compConfig = createEditorConfig();
console.log(compConfig)

compConfig.register({
    label:'文本',
    preview:"预览文本",
    render:"渲染文本",
    key:'text',
})

compConfig.register({
    label:'按钮',
    preview:<Button>预览按钮</Button>,
    render:<Button>渲染按钮</Button>,
    key:'button',
})

compConfig.register({
    label:'输入框',
    preview:<Input placeholder='预览输入框'/>,
    render:<Input placeholder='渲染输入框'/>,
    key:'input',
})