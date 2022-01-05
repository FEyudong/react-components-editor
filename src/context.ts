import React from "react";
export type EditorContextValuesType = {
    data:JSONSchemeType,
    setData:React.Dispatch<React.SetStateAction<JSONSchemeType>>
}
export const EditorContext = React.createContext<EditorContextValuesType>({
    data:{},
    setData:()=>{}
})