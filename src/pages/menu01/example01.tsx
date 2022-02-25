import React, { useMemo, useState } from "react";
import { Box } from "@chakra-ui/react";
import dataCollection from "../../service/data/data.json";
import { MyTable } from "Components/table/MyTable";
import { Column } from "react-table";
import { IDateType01 } from "Interface/dataType01";
import { useEffect } from "react";

export default function Example01() {
  const [selectedId, setSelectedId] = useState<string>("");

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
      {
        Header: "브랜드",
        accessor: "brand",
      },
      { Header: "모델", accessor: "model" },
      {
        Header: "생산년도",
        accessor: "year",
      },
    ],
    []
  );
  useEffect(() => {
    setSelectedId(dataCollection[0].last_name);
  }, []);

  return (
    <div>
      <MyTable
        data={dataCollection}
        columns={columnArray1}
        isSearch
        rowKey="last_name"
        selectedId={selectedId}
        handleRowClick={(clicked_row) => {
          setSelectedId(clicked_row);
        }}
      />
    </div>
  );
}
