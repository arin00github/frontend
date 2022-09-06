import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { PageHeader } from "../../layout/PageHeader";
import { PageBody } from "../../layout/PageBody";

export default function IndexMenu01() {
  return (
    <>
      <PageHeader>상태관리 라이브러리</PageHeader>
      <PageBody>
        <Text>redux와 context 비교</Text>
      </PageBody>
    </>
  );
}
