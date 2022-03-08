import React, { createContext, useContext, useReducer } from "react";

interface IState {
  map: naver.maps.Map;
}

const initialState: IState = {
  map: null,
};

function mapReducer03(state: IState, action: any) {
  switch (action.type) {
    case "CHANGE_MAP":
      return { ...state, map: action.map };
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}

const mapStateContext = createContext<IState>(null);
const mapDistpachContext = createContext(null);

export const MapProvider03 = ({ children }: any) => {
  const [state, dispatch] = useReducer(mapReducer03, initialState);

  return (
    <mapStateContext.Provider value={state}>
      <mapDistpachContext.Provider value={dispatch}>
        {children}
      </mapDistpachContext.Provider>
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
  const context = useContext(mapDistpachContext);
  if (!context) {
    throw new Error("Cannot find mapDistpachContext");
  }

  return context;
}
