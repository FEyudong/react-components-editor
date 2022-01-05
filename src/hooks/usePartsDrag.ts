
  import { useState,useEffect, useContext,useRef } from "react";
  import { EditorContext } from '../context';
  import {produce} from 'immer';
  /**
   * 物料区向画布拖拽添加组件块
   */
  export default (curDragComp:CompItemType | null)=>{
      const {data,setData} = useContext(EditorContext);;
      const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        if (!curDragComp) {
          return;
        }
        e.dataTransfer.dropEffect = "move";
      };
      const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        if (!curDragComp) {
          return;
        }
        e.preventDefault();
      };
      const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        if (!curDragComp) {
          return;
        }
        e.dataTransfer.dropEffect = "none";
      };
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
