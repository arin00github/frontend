import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { PageHeader } from "../../layout/PageHeader";
import { PageBody } from "../../layout/PageBody";

export default function IndexMenu01() {
  return (
    <>
      <PageHeader>React Table</PageHeader>
      <PageBody>
        <Text>react table 사용법</Text>
        {/* <MyTable data={dataCollection} columns={columnArray1} /> */}
      </PageBody>
    </>
  );
}
