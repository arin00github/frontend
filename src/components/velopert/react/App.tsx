import React from "react";
import { Box } from "@chakra-ui/react";
import { reduceRight } from "lodash";
import { createContext, useCallback, useReducer, useRef } from "react";
import UserList from "./UserList";
import { CreateUser } from "./CreateUser";
import { useInputs, UserInputsProps } from "./UseInput";

export interface IUserItem {
  id: number;
  username: string;
  email: string;
  active: boolean;
}

interface IUserList {
  inputs: {
    username: string;
    email: string;
  };
  users: IUserItem[];
}

const initialState: IUserList = {
  inputs: {
    username: "",
    email: "",
  },
  users: [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ],
};

function UserReducer(state: IUserList, action: any) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case "CREATE_USER":
      return {
        ...state,
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

export const UserDispatch = createContext(null);

export function App() {
  const [form, onChange, reset] = useInputs({
    username: "",
    email: "",
  });

  const { username, email }: any = form;

  const [state, dispatch] = useReducer(UserReducer, initialState);
  const { users } = state;
  //const { username, email } = state.inputs;

  const nextId = useRef(4);

  // const onChange = useCallback((e) => {
  //   const { name, value } = e.target;
  //   dispatch({ type: "CHANGE_INPUT", name, value });
  // }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    nextId.current += 1;
  }, [username, email]);

  const onToggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE_USER",
      id,
    });
  }, []);
  const onRemove = useCallback((id) => {
    dispatch({
      type: "REMOVE_USER",
      id,
    });
  }, []);

  return (
    <Box>
      <UserDispatch.Provider value={dispatch}>
        <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
        <CreateUser
          onChange={onChange}
          onCreate={onCreate}
          email={email}
          username={username}
        />
      </UserDispatch.Provider>
    </Box>
  );
}
