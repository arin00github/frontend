import React, { useContext } from "react";
import { TableContext } from "./index";

interface TableFilterProps {
  setGlobalFilter?: any;
}

const TableFilter = ({ setGlobalFilter }: TableFilterProps) => {
  const { instance } = useContext(TableContext);

  return (
    <div style={{ marginBottom: "16px" }}>
      <input
        onChange={(e) => {
          instance.setGlobalFilter(e.target.value);
        }}
        placeholder="Filter outside table"
      />
    </div>
  );
};

export default TableFilter;
