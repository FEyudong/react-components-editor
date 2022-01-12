import React, { useRef, useState } from "react";
import JSONScheme from "./JSONScheme";
import "./App.scss";
import { EditorContext } from "./context";

import Parts from "./components/Parts";
import Canvas from "./components/Canvas";
import Control from "./components/Control";
import Setting from "./components/Setting";

import { Layout } from "antd";
const { Header, Sider, Content } = Layout;

function App() {
  // 全局的jsonScheme
  const [data, setData] = useState<JSONSchemeType>(JSONScheme);

  // 当前正在拖拽的物料
  const [curDragComp,setCurDragComp] = useState<CompItemType | null>(null);
  
  // 物料区向画布开始拖拽
  const handlePartsDragStart = (e:React.DragEvent<HTMLDivElement>,comp:CompItemType)=>{
    setCurDragComp(comp)
  }
  // 拖拽事件结束
  const handlePartsDragEnd = (e:React.DragEvent<HTMLDivElement>)=>{
    setCurDragComp(null)
  }
  return (
    <EditorContext.Provider value={{
      data,
      setData
    }}>
      <Layout className="layout" >
        <Sider  theme='light'>
          {/* 左侧物料区 */}
          <Parts 
            handleDragStart={handlePartsDragStart}
            handleDragEnd={handlePartsDragEnd}
           />
        </Sider>
        <Layout>
          {/* 顶部功能栏 */}
          <Header style={{backgroundColor:'white'}}>
            <Control />
          </Header>
          <Content >
            {/* 中间画布 */}
            <Canvas curDragComp={curDragComp} style={{...data.container}} />
          </Content>
        </Layout>
        <Sider theme='light' >
          {/* 右侧属性设置区 */}
            <Setting/>
        </Sider>
      </Layout>
    </EditorContext.Provider>
  );
}
export default App;
