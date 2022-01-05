import {Button,Input} from 'antd';

function createEditorConfig(){
    const compList:CompItemType[] = [];
    const compMap:{
        [k:string]:CompItemType
    } = {};

    return {
        register:(comp:CompItemType)=>{
            compList.push(comp);
            compMap[comp.key] = comp
        },
        compList,
        compMap
    }
}
export const compConfig = createEditorConfig();


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