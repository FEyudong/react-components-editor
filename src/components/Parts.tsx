import React, { useContext,useRef, useState } from "react";
import {EditorContext} from '../context';
import {compConfig} from '../config';
import {Space,Card} from 'antd';

interface Props{
    handleDragStart:(e:React.DragEvent<HTMLDivElement>,comp:CompItemType)=>void
    handleDragEnd:(e:React.DragEvent<HTMLDivElement>)=>void
}
function Parts(props:Props){
    const { handleDragStart,handleDragEnd } = props;

    const {data} = useContext(EditorContext);
    return <section className="parts">
        <Space direction="vertical">
        {compConfig.compList.map((comp)=><Card 
            className="part-item"
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