import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

type globalState = {
  isLogin: boolean;
  state: string;
  url: string;
};

type Action =
  | { type: "SET_ISLOGIN"; islogin: boolean }
  | { type: "SET_STATE"; state: string }
  | { type: "SET_URL"; url: string };

type stateDispatch = Dispatch<Action>;

export const StateContext = createContext<globalState | null>(null);

export const DispatchContext = createContext<stateDispatch | null>(null);

const reducer = (state: globalState, action: Action): globalState => {
  switch (action.type) {
    case "SET_ISLOGIN":
      return {
        ...state,
        isLogin: action.islogin,
      };
    case "SET_STATE":
      return {
        ...state,
        state: action.state,
      };
    case "SET_URL":
      return {
        ...state,
        url: action.url,
      };
    default:
      throw new Error("Unhandled Action");
  }
};

type contextProps = {
  children: ReactNode;
};

export const ContextComponent = ({ children }: contextProps) => {
  const [state, dispatch] = useReducer(reducer, {
    isLogin: false,
    state: "close",
    url: "main.com",
  });
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const state = useContext(StateContext);
  if (!state) {
    throw new Error("Cannot find StateContextProvider");
  }
};
