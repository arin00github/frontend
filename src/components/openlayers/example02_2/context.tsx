import React, { createContext, useContext, useMemo, useReducer } from "react";
import Map from "ol/Map";

import "ol/ol.css";

interface IValue {
  map: Map;
}
// 초기값정의
const initialValue: IValue = {
  map: null,
};

// 리듀서 정의
function mapReducer(state: any, action: any) {
  switch (action.type) {
    case "CHANGE_INPUT":
      // console.log("action", action);
      return { ...state, value: action.value };
    case "CHANGE_MAP":
      console.log("map action", action);
      return { ...state, map: action.map };
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}

//Context 생성
export const mapStateContext = createContext<IValue>(null);
const mapDispatchContext = createContext(null);

//Provider 컴포넌트 제작 및 useReducer 사용
export const MapProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(mapReducer, initialValue);

  return (
    <mapStateContext.Provider value={state}>
      <mapDispatchContext.Provider value={dispatch}>
        {children}
      </mapDispatchContext.Provider>
    </mapStateContext.Provider>
  );
};

export const MapConsumer = ({ children }: any) => {
  return <mapStateContext.Consumer>{children}</mapStateContext.Consumer>;
};

// useContext 불러오고 다시 context 리턴
export function useMapState() {
  const context = useContext(mapStateContext);

  if (!context) {
    throw new Error("Cannot find mapStateContext");
  }
  return context;
}

export function useMapDispatch() {
  const context = useContext(mapDispatchContext);
  //console.log("context", context);
  if (!context) {
    throw new Error("Cannot find mapDispatchContext");
  }
  return context;
}
