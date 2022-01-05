import React,{useContext, useState} from 'react';
import { Modal, Button } from 'antd';
import {EditorContext} from '../context';
import ReactJson from 'react-json-view'
function ExportBtn(){
    const [modalVisible,setModalVisible] = useState(false);
    const {data} = useContext(EditorContext)
    return <>
        <Button onClick={()=>setModalVisible(true)} type='primary'>导出JSON数据</Button>
        <Modal visible={modalVisible} title='导出json' onCancel={()=>setModalVisible(false)}>
            {
               <ReactJson src={data} />
            }
        </Modal>
    </>
}
export default ExportBtn