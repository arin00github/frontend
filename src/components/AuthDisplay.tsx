import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { getLogin } from "../redux/auth";
import { useAppDispatch, useAppSelector } from "../redux/store";

export const AuthDisplay = () => {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  return (
    <Box>
      <Text mb={4}>
        {isLogin ? "안녕하세요 leegin님" : "로그인을 해주세요"}
      </Text>
      <Button onClick={() => dispatch(getLogin(!isLogin))}>
        {isLogin ? "로그아웃" : "로그인"}
      </Button>
    </Box>
  );
};
