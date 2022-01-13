import React, { useState, useEffect, useContext, useRef } from "react";
import { EditorContext } from "../context";
import { produce } from "immer";
/**
 * mouse相关事件模拟的h5拖拽
 */
export default () => {
  const { data, setData } = useContext(EditorContext);
  // 代表是否处于拖拽中的state
  const [isDraging, setIsDraging] = useState(false);

  // 记录位置的差值信息
  const dragStateRef = useRef<{
    startX: number;
    startY: number;
    startPos: { top: number; left: number }[];
  }>({
    startX: 0,
    startY: 0,
    startPos: [],
  });

  const mousedown = (e: React.MouseEvent) => {
    dragStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPos: data.blocks?.map(({ top, left }) => ({ top, left })) || [],
    };
    setIsDraging(true);
  };

  const mousemove = (e: MouseEvent) => {
    const { clientX: x, clientY: y } = e;
    const durX = x - dragStateRef.current.startX;
    const durY = y - dragStateRef.current.startY;
    setData((data) =>
      produce(data, (draft) => {
        draft.blocks?.forEach((item, index) => {
          if (item.isFocus) {
            item.left = dragStateRef.current.startPos[index].left + durX;
            item.top = dragStateRef.current.startPos[index].top + durY;
          }
        });
      })
    );
  };

  const mouseup = () => {
    setIsDraging(false);
  };

  useEffect(() => {
    if (isDraging) {
      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);
    }

    return () => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };
  }, [isDraging]);

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
   * 选中拖拽块
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
    mousedown(e);
  };
  return {
    handleBlockMouseDown,
    handleClearBlockFoucsState,
  };
};
