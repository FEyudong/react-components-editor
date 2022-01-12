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
  

  return {
    handleClearBlockFoucsState,
    handleBlockMouseDown,
  };
};
