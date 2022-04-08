import React, { useContext, useEffect } from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import { TableContext } from "./index";

interface ThisTableProps {
  columns: any;
  data: any[];
  header?: any;
}

// Our table component
const Table = ({ columns, data, header = null }: ThisTableProps) => {
  const { setInstance } = useContext(TableContext);
  const instance = useTable(
    {
      columns,
      data,
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  );

  useEffect(() => {
    setInstance(instance);
  }, [instance, setInstance]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = instance;

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 10);

  return (
    <>
      {header?.(instance)}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, idx) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={`group${idx}`}>
              {headerGroup.headers.map((column, it) => (
                <th {...column.getHeaderProps()} key={`column${it}`}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={`key${i}`}>
                {row.cells.map((cell, idx) => {
                  return (
                    <td {...cell.getCellProps()} key={`cell${idx}`}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
      <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </>
  );
};

export default Table;
