import React, { useImperativeHandle } from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";

interface ThisTableProps {
  columns: any;
  data: any[];
}
// Our table component
// eslint-disable-next-line react/display-name
const Table02 = React.forwardRef(
  ({ columns, data }: ThisTableProps, ref: any) => {
    const instance = useTable(
      {
        columns,
        data,
      },
      useFilters, // useFilters!
      useGlobalFilter // useGlobalFilter!
    );

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state,
    } = instance;

    // return table instance
    useImperativeHandle(ref, () => instance);

    // We don't want to render all of the rows for this example, so cap
    // it for this use case
    const firstPageRows = rows.slice(0, 10);

    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, idx) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={`group${idx}`}>
                {headerGroup.headers.map((column, id) => (
                  <th {...column.getHeaderProps()} key={`column${id}`}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map((row, ix) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={`row${ix}`}>
                  {row.cells.map((cell, i) => {
                    return (
                      <td {...cell.getCellProps()} key={`cell${i}`}>
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
  }
);

export default Table02;
