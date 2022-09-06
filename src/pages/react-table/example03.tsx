import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@chakra-ui/react";
import dataCollection3 from "../../service/data/data03.json";
import { MyTable } from "Components/table/MyTable";
import { Column } from "react-table";
import { IDateType03 } from "Interface/dataType01";

export default function Example03() {
  const [selectedId, setSelectedId] = useState<string>("");

  const columnArray3: Column<IDateType03>[] = useMemo(
    () => [
      {
        Header: "아이디",
        accessor: "id",
      },
      {
        Header: "사이즈",
        accessor: "size",
      },
      {
        Header: "색상",
        accessor: "color",
      },
      {
        Header: "가격",
        accessor: "price",
      },
    ],
    []
  );

  useEffect(() => {
    setSelectedId(dataCollection3[0].price);
  }, []);

  return (
    <div>
      <MyTable
        data={dataCollection3}
        columns={columnArray3}
        isSearch
        rowKey="price"
        selectedId={selectedId}
        handleRowClick={(clicked_row) => {
          setSelectedId(clicked_row);
        }}
      />
    </div>
  );
}
