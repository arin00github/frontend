import React from "react";
import { Box, Button, Input } from "@chakra-ui/react";

interface ICreatUser {
  username: string;
  email: string;
  onChange: any;
  onCreate: any;
}

export function CreateUser({
  username,
  email,
  onChange,
  onCreate,
}: ICreatUser) {
  return (
    <Box w="320px">
      <Input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <Input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <Button onClick={onCreate}>등록</Button>
    </Box>
  );
}
