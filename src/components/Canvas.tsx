import React, { useContext, useState, useRef, useMemo, useEffect } from "react";
import Block from "./Block";
import { EditorContext } from "../context";
import classNames from "classnames";

import usePartsDrag from "../hooks/usePartsDrag";
import useBlockFocus from "../hooks/useBlockFocus";
import useBlockDrag from "../hooks/useBlockDrag";

interface Props {
  style: React.CSSProperties;
  curDragComp: CompItemType | null;
}

function Canvas(props: Props) {
  const { style = {}, curDragComp } = props;
  const { data } = useContext(EditorContext);

  // 物料拖拽功能。向画布上添加一个物料
  const { handleDragEnter, handleDragOver, handleDragLeave, handleDrop } = usePartsDrag(curDragComp);

  // 画布元素拖拽功能，支持长按shfit多选。 调整组件块在画布上的位置，是用mouse相关事件模拟实现的，因为h5原生drag事件不支持同时拖动多个元素
  const { handleClearBlockFoucsState, handleBlockMouseDown } = useBlockDrag();

  return (
    <section
      className="canvas"
      onMouseDown={() => handleClearBlockFoucsState()}
    >
      <div
        className="container"
        style={style}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {data.blocks?.map((props, idx) => (
          <Block
            className={classNames({
              block: true,
              focus: props.isFocus,
            })}
            onMouseDown={(e) => handleBlockMouseDown(e, idx)}
            block={props}
            dataIndex={idx}
            key={`${props.key}_${props.top}_${props.left}_${idx}`}
          />
        ))}
      </div>
    </section>
  );
}
export default Canvas;
