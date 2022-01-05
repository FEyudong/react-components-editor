import React, { useContext,useEffect, useRef, useState } from "react";
import { compConfig } from "../config";
import { EditorContext } from "../context";
import { produce } from "immer";

interface Props extends React.HTMLAttributes<HTMLDivElement>  {
  block: BlockType;
  dataIndex: number
}

function Block(props: Props ) {
    const {block,dataIndex,...domProps} = props;
    const { top, left, zIndex, key , cursorCenter} = block;
    const {setData } = useContext(EditorContext);

    const RenderComp = compConfig.compMap[key].render;

    const blockRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
      if(cursorCenter){
         // 首次通过拖拽创建时，按鼠标位置居中 
        setData((data)=>produce(data,(draft)=>{
            const item =  draft.blocks?.[dataIndex]
            if(item){
                item.left = left -  blockRef.current!.offsetWidth / 2 ;
                item.top = top -  blockRef.current!.offsetHeight / 2 ;
                item.cursorCenter = false;
            }
        }))
      }
  },[])

  const styles = {
    top,
    left,
    zIndex,
};
  return (
    <div 
     style={styles} 
     ref={blockRef}
     {...domProps}
     >
      {RenderComp}
    </div>
  );
}
export default Block;
