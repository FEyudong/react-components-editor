
  import { useState,useEffect, useContext,useRef } from "react";
  import { EditorContext } from '../context';
  import {produce} from 'immer';
  /**
   * 物料区向画布拖拽添加组件块
   */
  export default (curDragComp:CompItemType | null)=>{
    
      const {data,setData} = useContext(EditorContext);

      // 拖拽目标进入画布
      const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        if (!curDragComp) {
          return;
        }
        e.dataTransfer.dropEffect = "move";//改变指针图标
      };
    
      const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        if (!curDragComp) {
          return;
        }
        e.preventDefault();
      };

      // 拖拽目标离开画布
      const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        if (!curDragComp) {
          return;
        }
        e.dataTransfer.dropEffect = "none";//还原指针图标
      };

      // 在画布上松手时，往画布上添加一个物料
      const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        if (!curDragComp) {
          return;
        }
        setData((data) =>
          produce(data, (draft) => {
            draft.blocks?.push({
              top: e.nativeEvent.offsetY,
              left: e.nativeEvent.offsetX,
              zIndex: 1,
              key: curDragComp?.key || "",
              cursorCenter: true,
            });
          })
        );
      };
      return {
        handleDragEnter,
        handleDragOver,
        handleDragLeave,
        handleDrop
      }
  }
