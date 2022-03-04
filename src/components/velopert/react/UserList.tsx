import React, { useContext } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { IUserItem } from "./App";
import { UserDispatch } from "./App";
interface IUserList {
  users: IUserItem[];
  onToggle: (id: string | number) => void;
  onRemove: (id: string | number) => void;
}

function UserList({ users, onToggle, onRemove }: IUserList) {
  return (
    <Box>
      {users.map((user, idx) => (
        <User user={user} onRemove={onRemove} onToggle={onToggle} key={idx} />
      ))}
    </Box>
  );
}

interface IUserComponent {
  user: IUserItem;
  onRemove: (id: string | number) => void;
  onToggle: (id: string | number) => void;
  key: string | number;
}

const User = React.memo(function User({ user, onRemove, key }: IUserComponent) {
  const dispatch = useContext(UserDispatch);

  return (
    <Box key={key} display="flex" h="48px" lineHeight="48px">
      <Text
        onClick={() => {
          dispatch({ type: "TOGGLE_USER", id: user.id });
        }}
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
        }}
        mr="4px"
        fontWeight="700"
      >
        {user.username}
      </Text>
      <Text>{user.email}</Text>
      <Button
        onClick={() => {
          dispatch({ type: "REMOVE_USER", id: user.id });
        }}
      >
        삭제
      </Button>
    </Box>
  );
});

export default React.memo(UserList);
