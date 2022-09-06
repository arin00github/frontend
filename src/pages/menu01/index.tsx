import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { PageHeader } from "../../layout/PageHeader";
import { PageBody } from "../../layout/PageBody";
import dataCollection from "../../service/data/data.json";
import { Column } from "react-table";
import { useMemo } from "react";
import { IDateType01 } from "../../service/interface/dataType01";

export default function IndexMenu01() {
  console.log(dataCollection);

  const columnArray1: Column<IDateType01>[] = useMemo(
    () => [
      {
        Header: "아이디",
        accessor: "id",
      },
      {
        Header: "이름",
        accessor: "last_name",
      },
      { Header: "도시", accessor: "city" },
    ],
    []
  );

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
