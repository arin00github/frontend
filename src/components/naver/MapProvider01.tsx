import React from "react";
import { createContext, useContext, useReducer } from "react";

interface IState {
  map: naver.maps.Map;
}

const initialState: IState = {
  map: null,
};

function mapReducer(state: IState, action: any) {
  switch (action.type) {
    case "CHANGE_MAP":
      return { ...state, map: action.map };
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}

const mapStateContext = createContext<IState>(null);
const mapDispatchContext = createContext(null);

export const MapProvider01 = ({ children }: any) => {
  const [state, dispatch] = useReducer(mapReducer, initialState);

  return (
    <mapStateContext.Provider value={state}>
      <mapDispatchContext.Provider value={dispatch}>
        {children}
      </mapDispatchContext.Provider>
    </mapStateContext.Provider>
  );
};

export function useMapState() {
  const context = useContext(mapStateContext);
  if (!context) {
    throw new Error("Cannot find mapStateContext");
  }
  return context;
}

export function useMapDispatch() {
  const context = useContext(mapDispatchContext);
  if (!context) {
    throw new Error("Cannot find mapDispatchContext");
  }
  return context;
}
