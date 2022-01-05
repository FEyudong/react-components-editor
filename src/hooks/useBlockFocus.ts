import React, { useState, useEffect, useContext, useRef } from "react";
import { EditorContext } from "../context";
import { produce } from "immer";
/**
 * 组件块选中逻辑
 */
export default (
  focusHandler: (e: React.MouseEvent) => void//选中后的处理回调
) => {
  const { data, setData } = useContext(EditorContext);
  
  /**
   * 清空所有组件的选中状态
   */
  const handleClearBlockFoucsState = () => {
    setData((data) =>
      produce(data, (draft) => {
        draft.blocks?.forEach((item) => {
          item.isFocus = false;
        });
      })
    );
  };

 /**
   * 选中
   */
  const handleBlockMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    dataIndex: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setData((data) =>
      produce(data, (draft) => {
          // 按住shift键支持多选
        if (e.shiftKey) {
          const block = draft.blocks![dataIndex];
          !block.isFocus && (block.isFocus = true);
        } else {
            // 否则默认单选
          draft.blocks?.forEach((item, index) => {
            if (index === dataIndex) {
              !item.isFocus && (item.isFocus = true);
            } else {
              item.isFocus = false;
            }
          });
        }
      })
    );
    focusHandler(e);
  };
  return {
    handleClearBlockFoucsState,
    handleBlockMouseDown,
  };
};
