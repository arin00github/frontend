import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { PageHeader } from "../../layout/PageHeader";
import { PageBody } from "../../layout/PageBody";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { AuthDisplay } from "Components/AuthDisplay";

export default function IndexMenu01() {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  return (
    <>
      <PageHeader>상태관리 라이브러리</PageHeader>
      <PageBody>
        <AuthDisplay />
      </PageBody>
    </>
  );
}
