import React from "react";
import {compConfig} from '../config';
import {Space,Card} from 'antd';

interface Props{
    handleDragStart:(e:React.DragEvent<HTMLDivElement>,comp:CompItemType)=>void // 开始拖拽
    handleDragEnd:(e:React.DragEvent<HTMLDivElement>)=>void // 拖拽结束
}
function Parts(props:Props){
    const { handleDragStart, handleDragEnd } = props;
    return <section className="parts">
        <Space direction="vertical">
        {compConfig.compList.map((comp)=><Card 
            className="part-item"
            bordered
            key={comp.key}
            title={comp.label}
            draggable
            onDragStart={(e)=>handleDragStart(e,comp)}
            onDragEnd={(e)=>handleDragEnd(e)}
        >
            <div>{comp.preview}</div>
        </Card>)}
        </Space>
    </section>
}
export default Parts;