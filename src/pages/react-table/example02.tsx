import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@chakra-ui/react";
import dataCollection2 from "../../service/data/data02.json";
import { MyTable } from "Components/table/MyTable";
import { Column } from "react-table";
import { IDateType02 } from "Interface/dataType01";

export default function Example02() {
  const [selectedId, setSelectedId] = useState<string>("");

  const columnArray2: Column<IDateType02>[] = useMemo(
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
        Header: "주",
        accessor: "state",
      },
    ],
    []
  );

  useEffect(() => {
    setSelectedId(dataCollection2[0].last_name);
  }, []);
  return (
    <div>
      <MyTable
        data={dataCollection2}
        columns={columnArray2}
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
